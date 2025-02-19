const Order = require('../../models/Order');

const resolvers = {
    Query: {
        // Fetch orders for a user
        getOrders: async (_, { userId }) => {
            try {
                console.log("Fetching orders for user:", userId);
                const orders = await Order.getOrdersByUserId(userId);
                return orders || [];
            } catch (error) {
                console.error(" Error fetching orders:", error);
                throw new Error("Failed to fetch orders");
            }
        }
    },

    Mutation: {
        // Place an order
        placeOrder: async (_, { userId, totalPrice }) => {
            try {
                console.log("Placing order for user:", userId);
                const orderId = await Order.createOrder(userId, totalPrice);
                return { id: orderId, user_id: userId, total_price: totalPrice };
            } catch (error) {
                console.error("Error placing order:", error);
                throw new Error("Failed to place order");
            }
        }
    }
};

module.exports = resolvers;
