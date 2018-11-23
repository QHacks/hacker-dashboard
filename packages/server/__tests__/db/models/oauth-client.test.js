const { OAuthClient } = require("../../config/mock-db");

describe("OAuthClient Model", () => {
  it("saves with a uuid", async () => {
    const {
      dataValues: { id }
    } = await OAuthClient.create({
      name: "test-client",
      clientSecret: "ABC123",
      firstParty: false,
      redirectUri: "https://joeyscoolwebsite.biz"
    });

    expect(id).toBeDefined();
  });

  it("validates redirect uri", (done) => {
    OAuthClient.create({
      name: "test-client",
      clientSecret: "ABC123",
      firstParty: false,
      redirectUri: "ayyy lmao"
    }).catch((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
