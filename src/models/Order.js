const db = require('../config/db'); 

const Order = {

  async getOrdersByUserId(userId) {
    try {
      const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  },


  async createOrder(userId, totalPrice) {
    try {
      const [result] = await db.query(
        'INSERT INTO orders (user_id, total_price) VALUES (?, ?)',
        [userId, totalPrice]
      );
      return result.insertId; 
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  },
};

module.exports = Order;
