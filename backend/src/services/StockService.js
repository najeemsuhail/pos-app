const prisma = require('../db/prisma');

const toNumber = (value) => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === 'object' && typeof value.toNumber === 'function') {
    return value.toNumber();
  }

  return Number(value) || 0;
};

class StockService {
  async applyPurchaseItems(tx, purchaseId, items = [], direction = 1) {
    const client = tx || prisma;
    const type = direction >= 0 ? 'purchase' : 'purchase_reversal';

    for (const item of items) {
      const ingredientId = Number(item.ingredientId ?? item.ingredient_id);
      const quantity = toNumber(item.quantity) * direction;

      if (!Number.isInteger(ingredientId) || ingredientId <= 0 || quantity === 0) {
        continue;
      }

      await client.ingredient.update({
        where: { id: ingredientId },
        data: {
          currentStock: {
            increment: quantity,
          },
        },
      });

      await client.stockMovement.create({
        data: {
          ingredientId,
          type,
          quantity,
          referenceType: 'purchase',
          referenceId: Number(purchaseId),
          note: item.itemName || item.item_name || null,
        },
      });
    }
  }

  async deductForOrder(tx, orderId) {
    const client = tx || prisma;
    const order = await client.order.findUnique({
      where: { id: Number(orderId) },
      include: { items: true },
    });

    if (!order || order.stockDeducted) {
      return;
    }

    const menuItemIds = [...new Set(order.items.map((item) => item.menuItemId))];
    if (menuItemIds.length === 0) {
      return;
    }

    const recipeItems = await client.menuItemIngredient.findMany({
      where: {
        menuItemId: { in: menuItemIds },
      },
      include: {
        ingredient: true,
        menuItem: true,
      },
    });

    const recipeByMenuItem = recipeItems.reduce((groups, recipeItem) => {
      if (!groups.has(recipeItem.menuItemId)) {
        groups.set(recipeItem.menuItemId, []);
      }
      groups.get(recipeItem.menuItemId).push(recipeItem);
      return groups;
    }, new Map());

    for (const orderItem of order.items) {
      const recipe = recipeByMenuItem.get(orderItem.menuItemId) || [];
      for (const recipeItem of recipe) {
        const quantity = -1 * toNumber(recipeItem.quantity) * Number(orderItem.quantity || 0);

        if (quantity === 0) {
          continue;
        }

        await client.ingredient.update({
          where: { id: recipeItem.ingredientId },
          data: {
            currentStock: {
              increment: quantity,
            },
          },
        });

        await client.stockMovement.create({
          data: {
            ingredientId: recipeItem.ingredientId,
            type: 'sale',
            quantity,
            referenceType: 'order',
            referenceId: Number(orderId),
            note: orderItem.name,
          },
        });
      }
    }

    await client.order.update({
      where: { id: Number(orderId) },
      data: {
        stockDeducted: true,
        updatedAt: new Date(),
      },
    });
  }
}

module.exports = new StockService();
