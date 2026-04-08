const pool = require('../db/pool');

class PaymentRepository {
  async create(orderId, method, amount, referenceId = null) {
    const result = await pool.query(
      `INSERT INTO payments (order_id, method, amount, reference_id, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [orderId, method, amount, referenceId]
    );
    return result.rows[0];
  }

  async findByOrderId(orderId) {
    const result = await pool.query('SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at', [orderId]);
    return result.rows;
  }

  async findAll(limit = 100, offset = 0) {
    const result = await pool.query(
      'SELECT * FROM payments ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  async findByDateRange(startDate, endDate) {
    const result = await pool.query(
      'SELECT * FROM payments WHERE created_at >= $1 AND created_at < $2 ORDER BY created_at DESC',
      [startDate, endDate]
    );
    return result.rows;
  }
}

module.exports = new PaymentRepository();
