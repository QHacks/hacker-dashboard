const { ROLES } = require("../../../oauth/authorization");

const { db } = global;

describe("OAuthUser Model", () => {
  it("saves with a uuid", async () => {
    const { dataValues: oauthUser } = await db.OAuthUser.create({
      scopes: JSON.stringify([{ user: "read", user: "write" }]),
      role: ROLES.ADMIN
    });

    expect(oauthUser.id).toBeDefined();
  });
});
