const { gql } = require("apollo-server-express");

const { db, graphqlClient } = global;

const GET_HACKER_BY_ID = gql`
  query GetHackerById($id: ID!) {
    hacker(id: $id) {
      firstName
      lastName
      email
    }
  }
`;

describe("Hacker Type", () => {
  it("queries individual hackers by id", async () => {
    const { query } = await graphqlClient();

    const { id } = await db.User.findOne({
      where: {
        email: "hacker1@test.com"
      }
    });

    const res = await query({
      query: GET_HACKER_BY_ID,
      variables: {
        id
      }
    });

    expect(res.data).toEqual({
      hacker: {
        firstName: "Vinith",
        lastName: "Suriyakumar",
        email: "hacker1@test.com"
      }
    });
  });
});
