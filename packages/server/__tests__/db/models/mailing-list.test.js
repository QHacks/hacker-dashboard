const { Event, MailingList } = require("../../config/mock-db");

describe("MailingList Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id } = await MailingList.create({
      name: "test mailing list",
      slug: "test-mailing-list",
      eventId
    });

    expect(id).toBeDefined();
  });

  it("has a unique index on slug and event", async (done) => {
    const { id: eventId } = await Event.findOne({});
    MailingList.bulkCreate([
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
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("slug must be unique");
      done();
    });
  });
});
