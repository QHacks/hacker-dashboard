const { OAuthRefreshToken } = require("../../config/mock-db");

describe("OAuthRefreshToken Model", () => {
  it("creates a uuid on save", async () => {
    const {
      dataValues: { id }
    } = await OAuthRefreshToken.create({
      expires: new Date(),
      refreshToken: "ABC123"
    });

    expect(id).toBeDefined();
  });
});
