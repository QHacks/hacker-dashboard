const { OAuthUser } = require("../../config/mock-db");

describe("OAuthUser Model", () => {
  it("creates a uuid on save", async () => {
    const { dataValues: oauthUser } = await OAuthUser.create({
      scopes: JSON.stringify([{ user: "read", user: "write" }]),
      role: "ADMIN"
    });

    expect(oauthUser.id).toBeDefined();
  });
});
