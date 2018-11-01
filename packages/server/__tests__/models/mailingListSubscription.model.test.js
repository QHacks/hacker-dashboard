const { MailingListSubscription, MailingList } = require("../../models");

describe("MailingListSubscription model", () => {
  it("saves correctly", (done) => {
    MailingList.findOne({}).then((list) => {
      const { _id: listId } = list;
      const mailingListSubscription = new MailingListSubscription({
        email: "ross@yopmail.com",
        list: listId
      });

      mailingListSubscription.save().then((res) => {
        expect(res.modifiedAt).toBeDefined();
        expect(res.createdAt).toBeDefined();
        done();
      });
    });
  });

  it("updates modifiedAt when updated", (done) => {
    MailingListSubscription.findOne({}).then((list) => {
      const { modifiedAt } = list;
      MailingListSubscription.findOneAndUpdate(
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
    MailingList.findOne({ name: "test-mailing-list" }).then((list) => {
      const invalidSubscription = new MailingListSubscription({
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

  it("has a case-insensitive index on emails and lists", (done) => {
    MailingList.findOne({ name: "test-mailing-list" }).then((list) => {
      const invalidSubscription = new MailingListSubscription({
        email: "BOB@yopmail.com",
        list: list._id
      });

      invalidSubscription.save().catch((err) => {
        expect(err).toBeDefined();
        expect(err.name).toBe("MongoError");
        done();
      });
    });
  });
});
