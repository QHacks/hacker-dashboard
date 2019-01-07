const { db } = global;

describe("MailingList Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await db.Event.findOne({});

    const { id } = await db.MailingList.create({
      name: "test mailing list",
      slug: "test-mailing-list",
      eventId
    });

    expect(id).toBeDefined();
  });

  it("has a unique index on slug and event", async () => {
    const { id: eventId } = await db.Event.findOne({});

    try {
      await db.MailingList.bulkCreate([
        {
          name: "test mailing list",
          slug: "test-mailing-list",
          eventId
        },
        {
          name: "sneaky mailing list",
          slug: "test-mailing-list",
          eventId
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("slug must be unique");
    }
  });
});
