const { gql } = require("apollo-server-express");

const {
  graphqlClient: { query },
  db
} = global;

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
  it("queries individual hackers", async (done) => {
    const { id } = await db.User.findOne({
      where: {
        email: "hacker1@gmail.com"
      }
    });

    const res = await query({
      query: GET_HACKER_BY_ID,
      variables: {
        id
      },
      headers: { Authorization: "Bearer bla" }
    });

    console.log(res);

    done();
  });
});
