const IngredientService = require('../services/IngredientService');

class IngredientController {
  async getAll(req, res, next) {
    try {
      const ingredients = await IngredientService.getIngredients();
      res.json(ingredients);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const ingredient = await IngredientService.createIngredient(req.body || {});
      res.status(201).json(ingredient);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const ingredient = await IngredientService.updateIngredient(req.params.id, req.body || {});
      res.json(ingredient);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const ingredient = await IngredientService.deleteIngredient(req.params.id);
      res.json({ message: 'Ingredient deleted', ingredient });
    } catch (error) {
      next(error);
    }
  }

  async alerts(req, res, next) {
    try {
      const ingredients = await IngredientService.getAlerts();
      res.json(ingredients);
    } catch (error) {
      next(error);
    }
  }

  async movements(req, res, next) {
    try {
      const { limit, ingredientId } = req.query;
      const movements = await IngredientService.getMovements(limit, ingredientId);
      res.json(movements);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new IngredientController();
