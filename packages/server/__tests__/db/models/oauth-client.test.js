const { db } = global;

describe("OAuthClient Model", () => {
  it("saves with a uuid", async () => {
    const {
      dataValues: { id }
    } = await db.OAuthClient.create({
      name: "test-client",
      clientSecret: "ABC123",
      firstParty: false,
      redirectUri: "https://joeyscoolwebsite.biz"
    });

    expect(id).toBeDefined();
  });

  it("validates redirect uri", async () => {
    try {
      await db.OAuthClient.create({
        name: "test-client",
        clientSecret: "ABC123",
        firstParty: false,
        redirectUri: "ayyy lmao"
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation isUrl on redirectUri failed");
    }
  });

  it("has a unique index on host", async () => {
    try {
      await db.OAuthClient.bulkCreate([
        {
          name: "test-client",
          clientSecret: "ABC123",
          firstParty: false,
          redirectUri: "test",
          host: "test-host"
        },
        {
          name: "hacker >:)",
          clientSecret: "ABC123",
          firstParty: false,
          redirectUri: "test",
          host: "test-host"
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("host must be unique");
    }
  });
});
