const { gql } = require("../../../config/mock-api");
const { User } = require("../../../config/mock-db");

describe("Hacker Type", () => {
  it("queries individual hackers", async () => {
    const { id: userId } = await User.findOne({
      where: {
        email: "jmichaelt98@gmail.com"
      }
    });

    const { id: hackerId } = await User.findOne({
      where: {
        email: "hacker1@gmail.com"
      }
    });

    const { data } = await gql(
      userId,
      `
        {
          hacker(id: "${hackerId}") {
            firstName
            lastName
            email
          }
        }
      `
    );

    expect(data).toEqual({
      hacker: {
        firstName: "Hacker",
        lastName: "1",
        email: "hacker1@gmail.com"
      }
    });
  });
});
