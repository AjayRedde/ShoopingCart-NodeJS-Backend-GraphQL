const { makeExecutableSchema } = require('@graphql-tools/schema');
const userType = require('./typeDefs/userType');
const productType = require('./typeDefs/productType');
const cartType = require('./typeDefs/cartType');
const orderType = require('./typeDefs/orderType');

const resolvers = require('./resolvers'); // Importing from resolvers/index.js

const schema = makeExecutableSchema({
  typeDefs: [userType, productType, cartType, orderType],
  resolvers: resolvers, // Use the merged resolvers
});

module.exports = schema;
