const { db } = global;

describe("EventCheckIn Model", () => {
  it("prevents duplicate records", async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id: userId } = await db.User.findOne({});

    try {
      await db.EventCheckIn.bulkCreate([
        {
          eventId,
          userId
        },
        {
          eventId,
          userId
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("userId must be unique");
    }
  });
});
