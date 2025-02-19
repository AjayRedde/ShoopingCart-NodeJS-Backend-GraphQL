const Cart = require('../../models/Cart');

const resolvers = {
        Query: {
            // Fetch cart items for a user
            getCartItems: async (_, { userId }) => {
                try {
                    console.log("Fetching cart items for user:", userId);
                    const cartItems = await Cart.getCartByUserId(userId);
                    return cartItems || [];
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                    throw new Error("Failed to fetch cart items");
                }
            }
    },

    Mutation: {
        //Add item to cart
        addToCart: async (_, { userId, productId, quantity }) => {
            try {
                console.log(`Adding product ${productId} to user ${userId}'s cart`);
                const cartItemId = await Cart.addToCart(userId, productId, quantity);
                return { id: cartItemId, user_id: userId, product_id: productId, quantity };
            } catch (error) {
                console.error("Error adding item to cart:", error);
                throw new Error("Failed to add item to cart");
            }
        }
    }
};

module.exports = resolvers;
