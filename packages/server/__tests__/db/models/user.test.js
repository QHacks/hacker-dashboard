const {
  User,
  OAuthUser,
  OAuthRefreshToken,
  OAuthClient
} = require("../../config/mock-db");

const defaultUser = {
  firstName: "New",
  lastName: "User",
  email: "newuser@yopmail.com",
  dateOfBirth: new Date(),
  phoneNumber: "123-456-789",
  password: "password"
};

describe("User Model", () => {
  it("hashes password on save", async () => {
    const { oauthUserId } = await createOAuthUser();
    const { dataValues: savedUser } = await User.create({
      ...defaultUser,
      oauthUserId
    });
    expect(savedUser.password).not.toBe("password");
  });

  it("creates a uuid on save", async () => {
    const { oauthUserId } = await createOAuthUser();
    const {
      dataValues: { id }
    } = await User.create({ ...defaultUser, oauthUserId });
    expect(id).toBeDefined();
  });

  it("hashes password on update", async (done) => {
    const foundUser = await User.findOne({});
    foundUser
      .update({ password: "newPassword" })
      .then(({ dataValues: { password } }) => {
        expect(password).not.toBe("newPassword");
        done();
      });
  });

  it("validates email", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({
      ...defaultUser,
      oauthUserId,
      email: "ayy lmao"
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation isEmail on email failed");
      done();
    });
  });

  it("validates date of birth", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({
      ...defaultUser,
      dateOfBirth: "ayyy lmao",
      oauthUserId
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation isDate on dateOfBirth failed");
      done();
    });
  });

  it("validates phone number", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({
      ...defaultUser,
      phoneNumber: "ayyy lmao",
      oauthUserId
    }).catch(({ errors: [{ message }] }) => {
      // NOTE: 'is' is regex validation in sequelize
      expect(message).toBe("Validation is on phoneNumber failed");
      done();
    });
  });

  it("validates profile image url", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({
      ...defaultUser,
      profileImageUrl: "ayyy lmao",
      oauthUserId
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation isUrl on profileImageUrl failed");
      done();
    });
  });

  it("validates resume url", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({
      ...defaultUser,
      resumeUrl: "ayyy lmao",
      oauthUserId
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation isUrl on resumeUrl failed");
      done();
    });
  });

  it("has a unique index on emails", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({
      ...defaultUser,
      oauthUserId,
      email: "bob@yopmail.com"
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("email must be unique");
      done();
    });
  });

  it("validates password length", async (done) => {
    const { oauthUserId } = await createOAuthUser();
    User.create({ ...defaultUser, oauthUserId, password: "lol" }).catch(
      ({ errors: [{ message }] }) => {
        expect(message).toBe("Validation len on password failed");
        done();
      }
    );
  });
});

async function createOAuthUser() {
  const { id: clientId } = await OAuthClient.findOne({});
  const { id: refreshTokenId } = await OAuthRefreshToken.create({
    expires: new Date(),
    refreshToken: "ABC123",
    clientId
  });
  const oauth = await OAuthUser.create({
    refreshTokenId,
    scopes: JSON.stringify([{ user: "read", user: "write" }]),
    role: "HACKER"
  });
  return { oauthUserId: oauth.id };
}
