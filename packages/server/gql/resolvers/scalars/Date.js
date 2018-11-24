const { GraphQLScalarType, Kind } = require("graphql");

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "An ISO-8601 encoded UTC date string.",
    parseValue(value) {
      // return new Date(value);
    },
    serialize(value) {
      // return value.getTime();
    },
    parseLiteral(ast) {
      // if (ast.kind === Kind.INT) {
      //   return parseInt(ast.value, 10);
      // }
      // return null;
    }
  })
};
