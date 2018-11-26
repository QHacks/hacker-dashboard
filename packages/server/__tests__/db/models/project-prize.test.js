const { Project, Prize, ProjectPrize, Event } = require("../../config/mock-db");

describe("ProjectPrize Model", () => {
  beforeEach(async () => {
    const { id: eventId } = await Event.findOne({});
    await Project.create({
      eventId,
      name: "QHacks Dashboard Unit Tests",
      description:
        "Tests written to ensure the security of the QHacks Dashboard"
    });
    await Prize.create({
      eventId,
      title: "Nobel Prize for Technology",
      description:
        "A prize awarded to the greatest technological advancement of the past year"
    });
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
      expect(message).toBe("prizeId must be unique");
      done();
    });
  });
});
