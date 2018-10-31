const { MailingList, Event } = require("../../models");

describe("MailingList model", () => {
  it("saves correctly", async () => {
    const event = (await Event.findOne({}))._id;
    const mailingList = new MailingList({
      event,
      name: "another-test-list"
    });

    const savedList = await mailingList.save();
    expect(savedList.modifiedAt).toBeDefined();
    expect(savedList.createdAt).toBeDefined();
  });

  it("updates modifiedAt when updated", async () => {
    const mailingList = await MailingList.findOne({});
    const updated = await MailingList.findOneAndUpdate(
      { _id: mailingList._id },
      { $set: { name: "a-new-name" } }
    );

    expect(updated.modifiedAt).not.toBe(mailingList.modifiedAt);
  });

  it("has a unique index on name and event", async () => {
    const event = await Event.findOne({ slug: "qhacks-2018" });
    const invalidMailingList = new MailingList({
      event: event._id,
      name: "test-mailing-list"
    });

    return invalidMailingList.save().catch((err) => {
      expect(err).toBeDefined();
      expect(err.name).toBe("MongoError");
    });
  });
});
