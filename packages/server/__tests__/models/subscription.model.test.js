const { Subscription, SubscriptionList } = require("../../models");

describe("Subscriptions model", () => {
  it("saves correctly", (done) => {
    SubscriptionList.findOne({}).then((list) => {
      const { _id: listId } = list;
      const subscription = new Subscription({
        email: "ross@yopmail.com",
        list: listId
      });

      subscription.save().then((res) => {
        expect(res.modifiedAt).toBeDefined();
        expect(res.createdAt).toBeDefined();
        done();
      });
    });
  });

  it("updates modifiedAt when updated", (done) => {
    Subscription.findOne({}).then((list) => {
      const { modifiedAt } = list;
      Subscription.findOneAndUpdate(
        { _id: list.id },
        {
          $set: { email: "joey@yopmail.com" }
        }
      ).then((updated) => {
        expect(updated.modifiedAt).not.toBe(modifiedAt);
        done();
      });
    });
  });

  it("has a unique index on emails and lists", (done) => {
    SubscriptionList.findOne({ slug: "test-mailing-list" }).then((list) => {
      const invalidSubscription = new Subscription({
        email: "bob@yopmail.com",
        list: list._id
      });

      invalidSubscription.save().catch((err) => {
        expect(err).toBeDefined();
        expect(err.name).toBe("MongoError");
        done();
      });
    });
  });

  it("validates email on save", (done) => {
    SubscriptionList.findOne({}).then((list) => {
      const invalidSubscription = new Subscription({
        email: "asdjgkadhdhslkdhga",
        list: list._id
      });

      invalidSubscription.save().catch((err) => {
        expect(err).toEqual({ error: "Invalid email provided!" });
        done();
      });
    });
  });

  it("validates email on update", () => {
    return Subscription.findOneAndUpdate(
      {},
      { email: "kadfhgjkshftgkl" }
    ).catch((err) => {
      expect(err).toEqual({ error: "Invalid email provided!" });
    });
  });
});
