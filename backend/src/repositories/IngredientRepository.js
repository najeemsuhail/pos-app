const prisma = require('../db/prisma');
const { mapIngredient, mapMenuItemIngredient, mapStockMovement } = require('../db/mappers');

class IngredientRepository {
  async findAll(includeDeleted = false) {
    const ingredients = await prisma.ingredient.findMany({
      where: includeDeleted ? {} : { isDeleted: false },
      orderBy: { name: 'asc' },
    });

    return ingredients.map(mapIngredient);
  }

  async findById(id) {
    const ingredient = await prisma.ingredient.findFirst({
      where: { id: Number(id), isDeleted: false },
    });

    return mapIngredient(ingredient);
  }

  async create(data) {
    const ingredient = await prisma.ingredient.create({
      data,
    });

    return mapIngredient(ingredient);
  }

  async update(id, data) {
    const ingredient = await prisma.ingredient.update({
      where: { id: Number(id) },
      data,
    });

    return mapIngredient(ingredient);
  }

  async softDelete(id) {
    const ingredient = await prisma.ingredient.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });

    return mapIngredient(ingredient);
  }

  async findAlerts() {
    const ingredients = await prisma.ingredient.findMany({
      where: { isDeleted: false },
      orderBy: [{ currentStock: 'asc' }, { name: 'asc' }],
    });

    return ingredients
      .map(mapIngredient)
      .filter((ingredient) => ingredient.is_out_of_stock || ingredient.is_low_stock);
  }

  async findMovements(limit = 100, ingredientId = null) {
    const movements = await prisma.stockMovement.findMany({
      where: ingredientId ? { ingredientId: Number(ingredientId) } : {},
      include: { ingredient: true },
      orderBy: { createdAt: 'desc' },
      take: Number(limit) || 100,
    });

    return movements.map(mapStockMovement);
  }

  async getMenuItemIngredients(menuItemId) {
    const recipeItems = await prisma.menuItemIngredient.findMany({
      where: { menuItemId: Number(menuItemId) },
      include: { ingredient: true },
      orderBy: { id: 'asc' },
    });

    return recipeItems.map(mapMenuItemIngredient);
  }

  async replaceMenuItemIngredients(menuItemId, recipeItems) {
    const updated = await prisma.$transaction(async (tx) => {
      await tx.menuItemIngredient.deleteMany({
        where: { menuItemId: Number(menuItemId) },
      });

      if (recipeItems.length > 0) {
        await tx.menuItemIngredient.createMany({
          data: recipeItems.map((item) => ({
            menuItemId: Number(menuItemId),
            ingredientId: item.ingredientId,
            quantity: item.quantity,
          })),
        });
      }

      return tx.menuItemIngredient.findMany({
        where: { menuItemId: Number(menuItemId) },
        include: { ingredient: true },
        orderBy: { id: 'asc' },
      });
    });

    return updated.map(mapMenuItemIngredient);
  }
}

module.exports = new IngredientRepository();
