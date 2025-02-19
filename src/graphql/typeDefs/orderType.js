const { gql } = require('graphql-tag');

const orderType = gql`
  type Order {
    id: ID!
    user_id: Int!
    total_price: Float!
  }

  type Query {
    getOrders(userId: Int!): [Order]
  }

  type Mutation {
    placeOrder(userId: Int!, totalPrice: Float!): Order
  }
`;

module.exports = orderType;
