const { Event, Project, ProjectUser, User } = require("../../config/mock-db");

describe("ProjectUser Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id: projectId } = await Project.create({
      name: "cool project",
      description: "my cool project B-)",
      eventId
    });
    const { id: userId } = await User.findOne({});
    const { id } = await ProjectUser.create({ projectId, userId });

    expect(id).toBeDefined();
  });

  it("doesn't allow duplicates", async (done) => {
    const { id: eventId } = await Event.findOne({});
    const { id: projectId } = await Project.create({
      name: "cool project",
      description: "my cool project B-)",
      eventId
    });
    const { id: userId } = await User.findOne({});
    ProjectUser.bulkCreate([
      { projectId, userId },
      { projectId, userId }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("userId must be unique");
      done();
    });
  });
});
