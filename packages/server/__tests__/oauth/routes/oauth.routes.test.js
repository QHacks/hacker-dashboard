const jwt = require("jsonwebtoken");

const { request, db } = global;
const { ROLES } = require("../../../oauth/authorization");

describe("OAuth API", () => {
  it("creates a new session for an existing user", async () => {
    const hacker = await db.User.findOne({
      where: { email: "hacker@test.com" }
    });

    const oldRefreshToken = await db.OAuthRefreshToken.findOne({
      where: { oauthUserId: hacker.oauthUserId }
    });

    const { body } = await request.post("/oauth/session").send({
      email: "hacker@test.com",
      password: "password",
      grantType: "password"
    });

    validateResponseBody(body);

    expect(body.refreshToken).not.toBe(oldRefreshToken.refreshToken);

    const newRefreshToken = await db.OAuthRefreshToken.findOne({
      where: { oauthUserId: hacker.oauthUserId }
    });

    expect(newRefreshToken.refreshToken).toBe(body.refreshToken);
  });

  it("signs up a new user", async () => {
    const { body } = await request.post("/oauth/signup").send({
      firstName: "Greatest",
      lastName: "Ever",
      email: "lebron@yopmail.com",
      password: "newpassword"
    });

    validateResponseBody(body);

    const newUser = await db.User.findOne({
      where: { email: "lebron@yopmail.com" },
      include: db.OAuthUser
    });

    expect(newUser.password).not.toEqual("newpassword");
    expect(newUser.OAuthUser.role).toBe(ROLES.HACKER);
  });

  it("refreshes a user's tokens", async () => {
    const hacker = await db.User.findOne({
      where: { email: "hacker@test.com" }
    });

    const previousRefreshToken = jwt.sign(
      { userId: hacker.id, type: "refresh" },
      "ABC123",
      { expiresIn: 3600, issuer: "QHacks Authentication" }
    );

    db.OAuthRefreshToken.update(
      {
        refreshToken: previousRefreshToken
      },
      {
        where: {
          oauthUserId: hacker.oauthUserId
        }
      }
    );

    const { body } = await request.post("/oauth/refresh").send({
      refreshToken: previousRefreshToken,
      grantType: "refresh_token"
    });

    await validateAccessToken(body.accessToken);
    await validateRefreshToken(body.refreshToken);

    expect(body.refreshToken).not.toBe(previousRefreshToken);

    const updatedRefreshToken = await db.OAuthRefreshToken.findOne({
      where: { oauthUserId: hacker.oauthUserId },
      order: [["createdAt", "DESC"]]
    });

    expect(updatedRefreshToken.refreshToken).toBe(body.refreshToken);
  });

  it("creates a reset hash for forgotten password", async () => {
    const { status } = await request.post("/oauth/createResetHash").send({
      email: "hacker@test.com"
    });

    expect(status).toBe(200);

    const hacker = await db.User.findOne({
      where: { email: "hacker@test.com" }
    });

    expect(hacker.resetPasswordHash).toBeDefined();
  });

  it("updates a user's password when provided a reset hash", async () => {
    const prevHacker = await db.User.findOne({
      where: { email: "hacker@test.com" }
    });

    await prevHacker.update({
      resetPasswordHash: "ABC123",
      resetPasswordHashExpiryDate: new Date(Date.now() + 100000000)
    });

    const { status } = await request
      .post("/oauth/updatePasswordForReset")
      .send({ resetHash: "ABC123", password: "newPassword" });

    expect(status).toBe(200);

    const currentHacker = await db.User.findOne({
      where: { email: "hacker@test.com" }
    });

    expect(currentHacker.password).not.toBe(prevHacker.password);
  });
});

async function validateResponseBody(body) {
  expect(body.accessToken).toBeDefined();
  expect(body.refreshToken).toBeDefined();
  expect(body.tokenType).toBe("bearer");
  expect(body.scopes).toEqual(["hacker:read"]);

  await validateAccessToken(body.accessToken);
  await validateRefreshToken(body.refreshToken);
}

function validateRefreshToken(refreshToken) {
  return new Promise((resolve) => {
    jwt.verify(refreshToken, "ABC123", (err, decoded) => {
      expect(err).toBeNull();
      expect(decoded.type).toBe("refresh");
      return resolve();
    });
  });
}

function validateAccessToken(accessToken) {
  return new Promise((resolve) => {
    jwt.verify(accessToken, "ABC123", (err, decoded) => {
      expect(err).toBeNull();
      expect(decoded.type).toBeUndefined();
      expect(decoded.userId).toBeDefined();
      return resolve();
    });
  });
}
