const db = require('../config/db'); 

const Product = {

  async getAllProducts() {
    try {
      const [rows] = await db.query('SELECT * FROM products');
      return rows; 
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },


  async createProduct(name, description, price, stock) {
    try {
      const [result] = await db.query(
        'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
        [name, description, price, stock]
      );
      return result.insertId; 
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Failed to add product');
    }
  },
};

module.exports = Product;
