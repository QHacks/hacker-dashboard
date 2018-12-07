const {
  OAuthRefreshToken,
  OAuthUser,
  OAuthClient
} = require("../../config/mock-db");

describe("OAuthRefreshToken Model", () => {
  it("creates a uuid on save", async () => {
    const { dataValues: oauthUser } = await OAuthUser.create({
      scopes: JSON.stringify([{ user: "read", user: "write" }]),
      role: "ADMIN"
    });

    const { dataValues: oauthClient } = await OAuthClient.create({
      name: "test-client",
      clientSecret: "ABC123",
      firstParty: false,
      redirectUri: "https://joeyscoolwebsite.biz"
    });

    const {
      dataValues: { id }
    } = await OAuthRefreshToken.create({
      oauthUserId: oauthUser.id,
      clientId: oauthClient.id,
      expiryDate: new Date(),
      refreshToken: "ABC123"
    });

    expect(id).toBeDefined();
  });
});
