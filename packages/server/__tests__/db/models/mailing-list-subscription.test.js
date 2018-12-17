const { db } = global;

describe("MailingListSubscription Model", () => {
  beforeEach(async () => {
    const { id: eventId } = await db.Event.findOne({});

    await db.MailingList.create({
      name: "test",
      slug: "test",
      eventId
    });
  });

  it("saves with a uuid", async () => {
    const { id: mailingListId } = await db.MailingList.findOne({});
    const { id: userId } = await db.User.findOne({});
    const { id } = await db.MailingListSubscription.create({
      mailingListId,
      userId,
      email: "joey@yopmail.com"
    });

    expect(id).toBeDefined();
  });

  it("prevents duplicate records", async () => {
    const { id: mailingListId } = await db.MailingList.findOne({});

    try {
      await db.MailingListSubscription.bulkCreate([
        {
          mailingListId,
          email: "joey@yopmail.com"
        },
        {
          mailingListId,
          email: "joey@yopmail.com"
        }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("mailingListId must be unique");
    }
  });
});
