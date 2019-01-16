const { db } = global;

describe("ApplicationFieldResponse Model", () => {
  it("prevents duplicate records", async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id: userId } = await db.User.findOne();

    try {
      const { id: applicationId } = await db.Application.create({
        status: "APPLIED",
        eventId,
        userId
      });

      const { id: applicationFieldId } = await db.ApplicationField.create({
        eventId,
        type: "TEXT_INPUT",
        shortLabel: "bigEvent",
        label: "What's the biggest event of 2019"
      });

      const answer = "qhacks ;)";

      await db.ApplicationFieldResponse.bulkCreate([
        {
          answer,
          applicationFieldId,
          applicationId
        },
        {
          answer,
          applicationFieldId,
          applicationId
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("applicationId must be unique");
    }
  });
});
