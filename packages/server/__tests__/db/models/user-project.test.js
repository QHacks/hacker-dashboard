const { db } = global;

describe("UserProject Model", () => {
  it("prevents duplicate records", async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id: userId } = await db.User.findOne({});

    const { id: projectId } = await db.Project.create({
      name: "cool project",
      description: "my cool project B-)",
      eventId
    });

    try {
      await db.UserProject.bulkCreate([
        { projectId, userId },
        { projectId, userId }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("userId must be unique");
    }
  });
});
