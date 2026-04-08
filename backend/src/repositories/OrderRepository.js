const pool = require('../db/pool');

class OrderRepository {
  async create(billNumber, subtotal, discountAmount, taxAmount, finalAmount) {
    const result = await pool.query(
      `INSERT INTO orders (bill_number, status, subtotal, discount_amount, tax_amount, final_amount, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [billNumber, 'pending', subtotal, discountAmount, taxAmount, finalAmount]
    );
    return result.rows[0];
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  }

  async findByBillNumber(billNumber) {
    const result = await pool.query('SELECT * FROM orders WHERE bill_number = $1', [billNumber]);
    return result.rows[0];
  }

  async update(id, subtotal, discountAmount, taxAmount, finalAmount) {
    const result = await pool.query(
      `UPDATE orders SET subtotal = $1, discount_amount = $2, tax_amount = $3, final_amount = $4, updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [subtotal, discountAmount, taxAmount, finalAmount, id]
    );
    return result.rows[0];
  }

  async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  async findAll(limit = 100, offset = 0) {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  async findByDateRange(startDate, endDate) {
    const result = await pool.query(
      'SELECT * FROM orders WHERE created_at >= $1 AND created_at < $2 ORDER BY created_at DESC',
      [startDate, endDate]
    );
    return result.rows;
  }
}

module.exports = new OrderRepository();
