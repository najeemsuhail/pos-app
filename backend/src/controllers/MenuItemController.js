const MenuItemService = require('../services/MenuItemService');
const { getUploadedImageUrl } = require('../utils/cloudinary');
const SyncService = require('../services/SyncService');

function parseBoolean(value, defaultValue = true) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') {
      return true;
    }
    if (normalized === 'false') {
      return false;
    }
  }

  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  return Boolean(value);
}

class MenuItemController {
  async create(req, res, next) {
    try {
      const { name, price, category_id, is_available } = req.body;
      const imageUrl = getUploadedImageUrl(req.file);
      const item = await MenuItemService.createMenuItem(
        name,
        price,
        category_id,
        parseBoolean(is_available, true),
        imageUrl
      );
      await SyncService.queueMenuItemSnapshot(item);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const items = await MenuItemService.getAllMenuItems();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const items = await MenuItemService.getMenuItemsByCategory(categoryId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await MenuItemService.getMenuItemById(id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, category_id, is_available } = req.body;
      const existingItem = await MenuItemService.getMenuItemById(id);
      const parsedAvailability = parseBoolean(is_available, existingItem.is_available);
      const imageUrl = req.file
        ? getUploadedImageUrl(req.file)
        : (req.body.image_url !== undefined ? req.body.image_url : existingItem.image_url);
      const item = await MenuItemService.updateMenuItem(
        id,
        name,
        price,
        category_id,
        parsedAvailability,
        imageUrl
      );
      await SyncService.queueMenuItemSnapshot(item);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const imageUrl = getUploadedImageUrl(req.file);
      const item = await MenuItemService.updateMenuItemImage(id, imageUrl);
      await SyncService.queueMenuItemSnapshot(item);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async toggleAvailability(req, res, next) {
    try {
      const { id } = req.params;
      const { is_available } = req.body;
      const item = await MenuItemService.toggleAvailability(id, parseBoolean(is_available, true));
      await SyncService.queueMenuItemSnapshot(item);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = await MenuItemService.deleteMenuItem(id);
      await SyncService.queueMenuItemSnapshot(item);
      res.json({ message: 'Menu item deleted', item });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MenuItemController();
