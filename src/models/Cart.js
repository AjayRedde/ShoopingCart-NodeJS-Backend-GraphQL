const db = require('../config/db'); 
const Cart = {

  async getCartByUserId(userId) {
    try {
      const [rows] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
      return rows; // Return cart
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw new Error('Failed to fetch cart items');
    }
  },

  async addToCart(userId, productId, quantity) {
    try {
      const [result] = await db.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
      return result.insertId; // Return the inserted cart item's ID
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  },


  async removeFromCart(cartId) {
    try {
      await db.query('DELETE FROM cart WHERE id = ?', [cartId]);
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw new Error('Failed to remove item from cart');
    }
  },

  async updateCartQuantity(cartId, quantity) {
    try {
      await db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId]);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw new Error('Failed to update cart quantity');
    }
  },
};

module.exports = Cart;
