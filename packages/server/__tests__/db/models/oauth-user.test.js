const { OAuthUser, OAuthRefreshToken } = require("../../config/mock-db");

describe("OAuthUser Model", () => {
  it("creates a uuid on save", async () => {
    const { id: refreshTokenId } = await OAuthRefreshToken.create({
      expires: new Date(),
      refreshToken: "ABC123"
    });
    const { dataValues: oauth } = await OAuthUser.create({
      refreshTokenId,
      scopes: JSON.stringify([{ user: "read", user: "write" }]),
      role: "ADMIN"
    });
    expect(oauth.id).toBeDefined();
  });
});
