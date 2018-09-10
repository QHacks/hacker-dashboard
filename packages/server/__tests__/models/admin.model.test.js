const { Admin } = require("../../models");
const { omit } = require("lodash");

describe("Admin model", () => {
  it("Saves correctly", async () => {
    const adminObject = {
      firstName: "admin",
      lastName: "test",
      email: "admintest@gmail.com",
      password: "password",
      reviewGroup: 3,
      goldenTickets: 10
    };
    const admin = new Admin(adminObject);

    const savedAdmin = await admin.save();
    const expectedAdmin = omit(savedAdmin.toObject(), [
      "password",
      "_id",
      "createdAt",
      "modifiedAt",
      "__v"
    ]);
    const actualAdmin = { ...omit(adminObject, ["password"]), role: "ADMIN" };

    expect(actualAdmin).toEqual(expectedAdmin);
  });

  it("Validates review group", () => {
    const admin = new Admin({
      firstName: "admin",
      lastName: "test",
      email: "admintest@gmail.com",
      password: "password",
      reviewGroup: -1,
      goldenTickets: 10
    });
    return admin.save().catch((err) => expect(err).toBeDefined());
  });
});
