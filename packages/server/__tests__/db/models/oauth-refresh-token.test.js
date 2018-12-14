const { db } = global;

describe("OAuthRefreshToken Model", () => {
  it("saves with a uuid", async () => {
    const { dataValues: oauthUser } = await db.OAuthUser.create({
      scopes: JSON.stringify([{ user: "read", user: "write" }]),
      role: "ADMIN"
    });

    const { dataValues: oauthClient } = await db.OAuthClient.create({
      name: "test-client",
      clientSecret: "ABC123",
      firstParty: false,
      redirectUri: "https://joeyscoolwebsite.biz"
    });

    const {
      dataValues: { id }
    } = await db.OAuthRefreshToken.create({
      oauthUserId: oauthUser.id,
      clientId: oauthClient.id,
      expiryDate: new Date(),
      refreshToken: "ABC123"
    });

    expect(id).toBeDefined();
  });
});
