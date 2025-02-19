const { gql } = require('graphql-tag');

const userType = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    users: [User]User
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): 
    login(email: String!, password: String!): AuthPayload  

  }
`;

module.exports = userType;
