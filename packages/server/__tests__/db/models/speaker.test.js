const { db } = global;

describe("Speaker Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id } = await db.Speaker.create({
      firstName: "Lee",
      lastName: "Byron",
      bio: "A cool guy B-)",
      companyName: "GraphQL",
      companyPosition: "Creator",
      eventId
    });

    expect(id).toBeDefined();
  });
});
