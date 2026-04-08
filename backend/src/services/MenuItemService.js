const MenuItemRepository = require('../repositories/MenuItemRepository');
const CategoryService = require('./CategoryService');

class MenuItemService {
  async createMenuItem(name, price, categoryId, isAvailable = true, imageUrl = null) {
    if (!name || !price || !categoryId) {
      throw { status: 400, message: 'Name, price, and category are required' };
    }

    await CategoryService.getCategoryById(categoryId);

    return await MenuItemRepository.create(name, price, categoryId, isAvailable, imageUrl);
  }

  async getAllMenuItems() {
    return await MenuItemRepository.findAll();
  }

  async getMenuItemsByCategory(categoryId) {
    await CategoryService.getCategoryById(categoryId);
    return await MenuItemRepository.findByCategory(categoryId);
  }

  async getMenuItemById(id) {
    const item = await MenuItemRepository.findById(id);
    if (!item) {
      throw { status: 404, message: 'Menu item not found' };
    }
    return item;
  }

  async updateMenuItem(id, name, price, categoryId, isAvailable, imageUrl = null) {
    await this.getMenuItemById(id);
    await CategoryService.getCategoryById(categoryId);

    if (!name || !price || !categoryId) {
      throw { status: 400, message: 'Name, price, and category are required' };
    }

    return await MenuItemRepository.update(id, name, price, categoryId, isAvailable, imageUrl);
  }

  async updateMenuItemImage(id, imageUrl) {
    await this.getMenuItemById(id);
    return await MenuItemRepository.updateImage(id, imageUrl);
  }

  async toggleAvailability(id, isAvailable) {
    await this.getMenuItemById(id);
    return await MenuItemRepository.toggleAvailability(id, isAvailable);
  }

  async deleteMenuItem(id) {
    await this.getMenuItemById(id);
    return await MenuItemRepository.softDelete(id);
  }
}

module.exports = new MenuItemService();
