import gql from "graphql-tag";

export default gql`
  type Mutation {
    authInfoUpdate(input: AuthInfoInput!): AuthInfo
  }

  type Query {
    authInfo: AuthInfo!
  }

  type AuthInfo {
    isAuthenticated: Boolean!
  }

  input AuthInfoInput {
    isAuthenticated: Boolean!
  }
`;
