const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
  async createCategory(name) {
    if (!name || name.trim() === '') {
      throw { status: 400, message: 'Category name is required' };
    }

    return await CategoryRepository.create(name);
  }

  async getAllCategories() {
    return await CategoryRepository.findAll();
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw { status: 404, message: 'Category not found' };
    }
    return category;
  }

  async updateCategory(id, name) {
    await this.getCategoryById(id);

    if (!name || name.trim() === '') {
      throw { status: 400, message: 'Category name is required' };
    }

    return await CategoryRepository.update(id, name);
  }

  async deleteCategory(id) {
    await this.getCategoryById(id);
    return await CategoryRepository.softDelete(id);
  }
}

module.exports = new CategoryService();
