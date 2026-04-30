const IngredientRepository = require('../repositories/IngredientRepository');
const MenuItemService = require('./MenuItemService');

const toFiniteNumber = (value, fallback = 0) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

class IngredientService {
  async getIngredients() {
    return IngredientRepository.findAll();
  }

  async getIngredientById(id) {
    const ingredient = await IngredientRepository.findById(id);
    if (!ingredient) {
      throw { status: 404, message: 'Ingredient not found' };
    }

    return ingredient;
  }

  async createIngredient(data) {
    const name = data.name?.trim();
    const unit = data.unit?.trim();
    const currentStock = toFiniteNumber(data.current_stock, 0);
    const minStockLevel = toFiniteNumber(data.min_stock_level, 0);

    if (!name) {
      throw { status: 400, message: 'Ingredient name is required' };
    }

    if (!unit) {
      throw { status: 400, message: 'Ingredient unit is required' };
    }

    if (minStockLevel < 0) {
      throw { status: 400, message: 'Minimum stock cannot be negative' };
    }

    return IngredientRepository.create({
      name,
      unit,
      currentStock,
      minStockLevel,
    });
  }

  async updateIngredient(id, data) {
    await this.getIngredientById(id);

    const name = data.name?.trim();
    const unit = data.unit?.trim();
    const currentStock = toFiniteNumber(data.current_stock, 0);
    const minStockLevel = toFiniteNumber(data.min_stock_level, 0);

    if (!name) {
      throw { status: 400, message: 'Ingredient name is required' };
    }

    if (!unit) {
      throw { status: 400, message: 'Ingredient unit is required' };
    }

    if (minStockLevel < 0) {
      throw { status: 400, message: 'Minimum stock cannot be negative' };
    }

    return IngredientRepository.update(id, {
      name,
      unit,
      currentStock,
      minStockLevel,
    });
  }

  async deleteIngredient(id) {
    await this.getIngredientById(id);
    return IngredientRepository.softDelete(id);
  }

  async getAlerts() {
    return IngredientRepository.findAlerts();
  }

  async getMovements(limit, ingredientId) {
    return IngredientRepository.findMovements(limit, ingredientId);
  }

  async getMenuItemIngredients(menuItemId) {
    await MenuItemService.getMenuItemById(menuItemId);
    return IngredientRepository.getMenuItemIngredients(menuItemId);
  }

  async replaceMenuItemIngredients(menuItemId, items = []) {
    await MenuItemService.getMenuItemById(menuItemId);

    if (!Array.isArray(items)) {
      throw { status: 400, message: 'Ingredients array is required' };
    }

    const recipeItems = [];
    const seen = new Set();

    for (const [index, item] of items.entries()) {
      const ingredientId = Number(item.ingredient_id);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(ingredientId) || ingredientId <= 0) {
        throw { status: 400, message: `Ingredient ${index + 1} is required` };
      }

      if (!Number.isFinite(quantity) || quantity <= 0) {
        throw { status: 400, message: `Ingredient ${index + 1} quantity must be greater than zero` };
      }

      if (seen.has(ingredientId)) {
        throw { status: 400, message: 'Each ingredient can only be added once per menu item' };
      }

      await this.getIngredientById(ingredientId);
      seen.add(ingredientId);
      recipeItems.push({ ingredientId, quantity });
    }

    return IngredientRepository.replaceMenuItemIngredients(menuItemId, recipeItems);
  }
}

module.exports = new IngredientService();
