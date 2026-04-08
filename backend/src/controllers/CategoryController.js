const CategoryService = require('../services/CategoryService');

class CategoryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const category = await CategoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await CategoryService.updateCategory(id, name);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deleteCategory(id);
      res.json({ message: 'Category deleted', category });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
