const pool = require('../db/pool');

class MenuItemRepository {
  async create(name, price, categoryId, isAvailable = true, imageUrl = null) {
    const result = await pool.query(
      'INSERT INTO menu_items (name, price, category_id, is_available, image_url, is_deleted) VALUES ($1, $2, $3, $4, $5, false) RETURNING *',
      [name, price, categoryId, isAvailable, imageUrl]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query(
      'SELECT * FROM menu_items WHERE is_deleted = false ORDER BY category_id, name'
    );
    return result.rows;
  }

  async findByCategory(categoryId) {
    const result = await pool.query(
      'SELECT * FROM menu_items WHERE category_id = $1 AND is_deleted = false AND is_available = true ORDER BY name',
      [categoryId]
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM menu_items WHERE id = $1 AND is_deleted = false', [id]);
    return result.rows[0];
  }

  async update(id, name, price, categoryId, isAvailable, imageUrl = null) {
    const result = await pool.query(
      'UPDATE menu_items SET name = $1, price = $2, category_id = $3, is_available = $4, image_url = $5 WHERE id = $6 AND is_deleted = false RETURNING *',
      [name, price, categoryId, isAvailable, imageUrl, id]
    );
    return result.rows[0];
  }

  async updateImage(id, imageUrl) {
    const result = await pool.query(
      'UPDATE menu_items SET image_url = $1 WHERE id = $2 AND is_deleted = false RETURNING *',
      [imageUrl, id]
    );
    return result.rows[0];
  }

  async toggleAvailability(id, isAvailable) {
    const result = await pool.query(
      'UPDATE menu_items SET is_available = $1 WHERE id = $2 AND is_deleted = false RETURNING *',
      [isAvailable, id]
    );
    return result.rows[0];
  }

  async softDelete(id) {
    const result = await pool.query(
      'UPDATE menu_items SET is_deleted = true WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = new MenuItemRepository();
