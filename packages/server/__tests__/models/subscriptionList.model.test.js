const { SubscriptionList, Event } = require("../../models");

describe("Subscriptions model", () => {
  it("saves correctly", async () => {
    const event = (await Event.findOne({}))._id;
    const subscriptionList = new SubscriptionList({
      event,
      slug: "another-test-list"
    });

    const savedList = await subscriptionList.save();
    expect(savedList.modifiedAt).toBeDefined();
    expect(savedList.createdAt).toBeDefined();
  });

  it("updates modifiedAt when updated", async () => {
    const subscriptionList = await SubscriptionList.findOne({});
    const updated = await SubscriptionList.findOneAndUpdate(
      { _id: subscriptionList._id },
      { $set: { slug: "a-new-slug" } }
    );

    expect(updated.modifiedAt).not.toBe(subscriptionList.modifiedAt);
  });

  it("has a unique index on slug and event", async () => {
    const event = await Event.findOne({ slug: "qhacks-2018" });
    const invalidSubscriptionList = new SubscriptionList({
      event,
      slug: "test-mailing-list"
    });

    return invalidSubscriptionList.save().catch((err) => {
      expect(err).toBeDefined();
      expect(err.name).toBe("MongoError");
    });
  });
});
