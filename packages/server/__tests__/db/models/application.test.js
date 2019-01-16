const { db } = global;

describe("Application Model", () => {
  it("saves with a uuid", async () => {
    const { id: userId } = await db.User.findOne({});
    const { id: eventId } = await db.Event.findOne({});

    const { id } = await db.Application.create({
      status: "APPLIED",
      eventId,
      userId
    });

    expect(id).toBeDefined();
  });

  it("has a unique index on user and event", async () => {
    const { id: userId } = await db.User.findOne({});
    const { id: eventId } = await db.Event.findOne({});

    try {
      await db.Application.bulkCreate([
        {
          status: "APPLIED",
          eventId,
          userId
        },
        {
          status: "APPLIED",
          eventId,
          userId
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("eventId must be unique");
    }
  });
});
