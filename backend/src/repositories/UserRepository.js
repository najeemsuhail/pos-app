const pool = require('../db/pool');

class UserRepository {
  async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE name = $1', [username]);
    return result.rows[0];
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(name, role, password) {
    const result = await pool.query(
      'INSERT INTO users (name, role, password) VALUES ($1, $2, $3) RETURNING *',
      [name, role, password]
    );
    return result.rows[0];
  }

  async all() {
    const result = await pool.query('SELECT id, name, role, created_at FROM users ORDER BY created_at DESC');
    return result.rows;
  }

  async getAll() {
    return await this.all();
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = new UserRepository();
