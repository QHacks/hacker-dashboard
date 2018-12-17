const { db } = global;

describe("ProjectPrize Model", () => {
  beforeEach(async () => {
    const { id: eventId } = await db.Event.findOne({});

    await db.Project.create({
      eventId,
      name: "QHacks Dashboard Unit Tests",
      description:
        "Tests written to ensure the security of the QHacks Dashboard"
    });

    await db.Prize.create({
      eventId,
      title: "Nobel Prize for Technology",
      description:
        "A prize awarded to the greatest technological advancement of the past year"
    });
  });

  it("prevents duplicate records", async () => {
    const { id: projectId } = await db.Project.findOne({});
    const { id: prizeId } = await db.Prize.findOne({});

    try {
      await db.ProjectPrize.bulkCreate([
        {
          projectId,
          prizeId
        },
        {
          projectId,
          prizeId
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("prizeId must be unique");
    }
  });
});
