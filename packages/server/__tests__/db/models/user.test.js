const { ROLES } = require("../../../oauth/authorization");

const { db } = global;

const defaultUser = {
  firstName: "New",
  lastName: "User",
  email: "newuser@yopmail.com",
  dateOfBirth: new Date(),
  phoneNumber: "123-456-789",
  password: "password"
};

describe("User Model", () => {
  it("saves with a uuid", async () => {
    const { oauthUserId } = await createOAuthUser();
    const {
      dataValues: { id }
    } = await db.User.create({ ...defaultUser, oauthUserId });

    expect(id).toBeDefined();
  });

  it("hashes password on save", async () => {
    const { oauthUserId } = await createOAuthUser();
    const { dataValues: savedUser } = await db.User.create({
      ...defaultUser,
      oauthUserId
    });

    expect(savedUser.password).not.toBe("password");
  });

  it("hashes password on update", async () => {
    const foundUser = await db.User.findOne({});

    const user = await foundUser.update({ password: "newPassword" });

    expect(user.dataValues.password).not.toBe("newPassword");
  });

  it("validates email", async () => {
    const { oauthUserId } = await createOAuthUser();
    try {
      await db.User.create({
        ...defaultUser,
        oauthUserId,
        email: "ayy lmao"
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation isEmail on email failed");
    }
  });

  it("validates date of birth", async () => {
    const { oauthUserId } = await createOAuthUser();
    try {
      await db.User.create({
        ...defaultUser,
        dateOfBirth: "ayyy lmao",
        oauthUserId
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation isDate on dateOfBirth failed");
    }
  });

  it("validates phone number", async () => {
    const { oauthUserId } = await createOAuthUser();
    try {
      await db.User.create({
        ...defaultUser,
        phoneNumber: "ayyy lmao",
        oauthUserId
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation is on phoneNumber failed");
    }
  });

  it("validates profile image url", async () => {
    const { oauthUserId } = await createOAuthUser();

    try {
      await db.User.create({
        ...defaultUser,
        profileImageUrl: "ayyy lmao",
        oauthUserId
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation isUrl on profileImageUrl failed");
    }
  });

  it("validates resume url", async () => {
    const { oauthUserId } = await createOAuthUser();

    try {
      await db.User.create({
        ...defaultUser,
        resumeUrl: "ayyy lmao",
        oauthUserId
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation isUrl on resumeUrl failed");
    }
  });

  it("has a unique index on emails", async () => {
    const { oauthUserId } = await createOAuthUser();

    try {
      await db.User.create({
        ...defaultUser,
        oauthUserId,
        email: "bob@yopmail.com"
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("email must be unique");
    }
  });

  it("validates password length", async () => {
    const { oauthUserId } = await createOAuthUser();

    try {
      await db.User.create({
        ...defaultUser,
        oauthUserId,
        password: "lol"
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation len on password failed");
    }
  });
});

async function createOAuthUser() {
  const { dataValues: oauthUser } = await db.OAuthUser.create({
    scopes: JSON.stringify([{ user: "read", user: "write" }]),
    role: ROLES.HACKER
  });

  return { oauthUserId: oauthUser.id };
}
