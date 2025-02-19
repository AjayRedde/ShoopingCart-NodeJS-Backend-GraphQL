const { gql } = require('graphql-tag');

const productType = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    stock: Int!
  }

  type Query {
    getProducts: [Product]
  }

  type Mutation {
    addProduct(name: String!, description: String, price: Float!, stock: Int!): Product
  }
`;

module.exports = productType;
