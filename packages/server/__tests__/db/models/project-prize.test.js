const { Project, Prize, ProjectPrize, Event } = require("../../config/mock-db");

describe("ProjectPrize Model", () => {
  beforeEach(async () => {
    const { id: eventId } = await Event.findOne({});
    await Project.create({
      eventId,
      name: "QHack's Dashboard",
      description: "Test project"
    });
    await Prize.create({
      eventId,
      title: "My Prize",
      description: "A really good prize!"
    });
  });

  it("creates a uuid on save", async () => {
    const { id: projectId } = await Project.findOne({});
    const { id: prizeId } = await Prize.findOne({});
    const { id } = await ProjectPrize.create({
      projectId,
      prizeId
    });

    expect(id).toBeDefined();
  });

  it("prevents duplicates", async (done) => {
    const { id: projectId } = await Project.findOne({});
    const { id: prizeId } = await Prize.findOne({});
    ProjectPrize.bulkCreate([
      {
        projectId,
        prizeId
      },
      {
        projectId,
        prizeId
      }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("projectId must be unique");
      done();
    });
  });
});
