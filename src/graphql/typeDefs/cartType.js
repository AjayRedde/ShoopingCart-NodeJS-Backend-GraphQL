const { gql } = require('graphql-tag');

const cartType = gql`
  type CartItem {
    id: ID!
    user_id: Int!
    product_id: Int!
    quantity: Int!
  }

  type Query {
    getCartItems(userId: Int!): [CartItem]
  }

  type Mutation {
    addToCart(userId: Int!, productId: Int!, quantity: Int!): CartItem
  }
`;

module.exports = cartType;
