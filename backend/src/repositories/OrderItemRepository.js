const pool = require('../db/pool');

class OrderItemRepository {
  async create(orderId, menuItemId, name, price, quantity) {
    const result = await pool.query(
      `INSERT INTO order_items (order_id, menu_item_id, name, price, quantity) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [orderId, menuItemId, name, price, quantity]
    );
    return result.rows[0];
  }

  async findByOrderId(orderId) {
    const result = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    return result.rows;
  }

  async updateQuantity(id, quantity) {
    const result = await pool.query(
      'UPDATE order_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM order_items WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new OrderItemRepository();
