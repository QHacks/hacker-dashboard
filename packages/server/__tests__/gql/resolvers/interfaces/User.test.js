const { gql } = require("../../../config/mock-api");
const { User } = require("../../../config/mock-db");

describe("User Interface", () => {
  it("returns data about the current user", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "ross.hill@rosshill.ca" }
    });
    const { data } = await gql(
      userId,
      `
      {
        user {
          firstName
          lastName
          email
          oauthInfo {
            role
          }
        }
      }
      `
    );

    expect(data).toEqual({
      user: {
        firstName: "Ross",
        lastName: "Hill",
        email: "ross.hill@rosshill.ca",
        oauthInfo: { role: "ADMIN" }
      }
    });
  });
});
