const { gql } = require("apollo-server-express");

const { graphqlClient } = global;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    user {
      firstName
      lastName
      email
      oauthInfo {
        role
      }
    }
  }
`;

describe("User Interface", () => {
  it("queries the current user", async () => {
    const { query } = await graphqlClient();

    const res = await query({
      query: GET_CURRENT_USER
    });

    expect(res.data).toEqual({
      user: {
        firstName: "Joey",
        lastName: "Tepperman",
        email: "hacker@test.com",
        oauthInfo: {
          role: "HACKER"
        }
      }
    });
  });
});
