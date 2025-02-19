const userResolvers = require("./userResolver");
const productResolvers = require("./productResolver");
const cartResolvers = require("./cartResolver");
const orderResolvers = require("./orderResolver");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
    ...cartResolvers.Query,
    ...orderResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...orderResolvers.Mutation,
  }
};
