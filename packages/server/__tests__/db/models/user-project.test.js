const { Event, Project, UserProject, User } = require("../../config/mock-db");

describe("UserProject Model", () => {
  it("doesn't allow duplicates", async (done) => {
    const { id: eventId } = await Event.findOne({});
    const { id: projectId } = await Project.create({
      name: "cool project",
      description: "my cool project B-)",
      eventId
    });
    const { id: userId } = await User.findOne({});
    UserProject.bulkCreate([
      { projectId, userId },
      { projectId, userId }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("userId must be unique");
      done();
    });
  });
});
