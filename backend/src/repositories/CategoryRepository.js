const pool = require('../db/pool');

class CategoryRepository {
  async create(name) {
    const result = await pool.query(
      'INSERT INTO categories (name, is_deleted) VALUES ($1, false) RETURNING *',
      [name]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query('SELECT * FROM categories WHERE is_deleted = false ORDER BY name');
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1 AND is_deleted = false', [id]);
    return result.rows[0];
  }

  async update(id, name) {
    const result = await pool.query(
      'UPDATE categories SET name = $1 WHERE id = $2 AND is_deleted = false RETURNING *',
      [name, id]
    );
    return result.rows[0];
  }

  async softDelete(id) {
    const result = await pool.query(
      'UPDATE categories SET is_deleted = true WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = new CategoryRepository();
