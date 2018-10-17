const { User, Admin, Hacker } = require("../../models");

describe("Users model", () => {
  it("Returns all hackers and admins", async () => {
    const users = await User.find({});
    const admins = await Admin.find({});
    const hackers = await Hacker.find({});

    const toObject = (i) => i.toObject();
    const allUsers = users.map(toObject);
    const allAdmins = admins.map(toObject);
    const allHackers = hackers.map(toObject);

    const byDate = (a, b) => a.createdAt - b.createdAt;
    const expectedUsers = [...allAdmins, ...allHackers].sort(byDate);
    allUsers.sort(byDate).map((obj, i) => {
      expect(obj).toEqual(expectedUsers[i]);
    });
  });
});
