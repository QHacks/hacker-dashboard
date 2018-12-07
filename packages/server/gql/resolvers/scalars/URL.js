const { GraphQLScalarType, Kind } = require("graphql");

module.exports = {
  URL: new GraphQLScalarType({
    name: "URL",
    description: "An RFC 3986 and RFC 3987 compliant URI string.",
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
