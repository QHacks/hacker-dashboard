import gql from "graphql-tag";

export default gql`
  type Mutation {
    login(input: LoginInput!): AuthInfo
    logout: AuthInfo
  }

  type Query {
    authInfo: AuthInfo!
  }

  type AuthInfo {
    isAuthenticated: Boolean!
  }

  input LoginInput {
    accessToken: String!
    refreshToken: String!
  }
`;
