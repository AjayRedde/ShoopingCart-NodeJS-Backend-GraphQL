const Product = require('../../models/Product');

const resolvers = {
    Query: {
        // Fetch all products
        getProducts: async () => {
            try {
                console.log(" Fetching products from database...");
                const products = await Product.getAllProducts();
        
                if (!products || products.length === 0) {
                    console.warn("No products found in database.");
                    return [];
                }
        
                console.log(" Products fetched:", products);
                return products;

            } catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        }
        
    },

    Mutation: {
        // Adding a new product
        addProduct: async (_, { name, description, price, stock }) => {
            try {
                console.log(" Adding product:", name);
                const productId = await Product.createProduct(name, description, price, stock);
                return { id: productId, name, description, price, stock };
            } catch (error) {
                console.error("Error adding product:", error);
                throw new Error("Failed to add product");
            }
        }
    }
};

module.exports = resolvers;
