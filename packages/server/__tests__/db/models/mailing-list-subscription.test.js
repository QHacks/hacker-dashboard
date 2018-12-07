const {
  MailingList,
  MailingListSubscription,
  Event,
  User
} = require("../../config/mock-db");

describe("MailingListSubscription", () => {
  beforeEach(async () => {
    const { id: eventId } = await Event.findOne({});
    return MailingList.create({
      name: "test",
      slug: "test",
      eventId
    });
  });

  it("saves with a uuid", async () => {
    const { id: mailingListId } = await MailingList.findOne({});
    const { id: userId } = await User.findOne({});
    const { id } = await MailingListSubscription.create({
      mailingListId,
      userId,
      email: "joey@yopmail.com"
    });

    expect(id).toBeDefined();
  });

  it("prevents duplicates", async (done) => {
    const { id: mailingListId } = await MailingList.findOne({});

    MailingListSubscription.bulkCreate([
      {
        mailingListId,
        email: "joey@yopmail.com"
      },
      {
        mailingListId,
        email: "joey@yopmail.com"
      }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("mailingListId must be unique");
      done();
    });
  });
});
