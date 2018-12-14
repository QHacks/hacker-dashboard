const { db } = global;

describe("Project Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id } = await db.Project.create({
      eventId,
      name: "Lorem Ipsum",
      description: "lorem ipsum"
    });

    expect(id).toBeDefined();
  });
});
