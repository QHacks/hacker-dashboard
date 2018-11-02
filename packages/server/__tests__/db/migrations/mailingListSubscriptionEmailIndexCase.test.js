process.env.MIGRATION_TEST = true;
const {
  up,
  down
} = require("../../../db/migrations/1541111432234-mailingListSubscriptionEmailIndexCase");
const { MailingListSubscription, MailingList } = require("../../../models");

describe("Migration 1541111432234-mailingListSubscriptionEmailIndexCase", () => {
  it("Works in the upwards direction", async () => {
    MailingListSubscription.collection.dropIndex({ email: 1, list: 1 });
    MailingListSubscription.collection.createIndex(
      { email: 1, list: 1 },
      { unique: true }
    );

    const { _id: list } = await MailingList.findOne({});
    const oldSubscriptions = [
      {
        email: "BOB@yopmail.com",
        list
      },
      {
        email: "bOb@yopmail.com",
        list
      },
      {
        email: "ROSS@yopmail.com",
        list
      },
      {
        email: "ross@yopmail.com",
        list
      },
      {
        email: "joey@yopmail.com",
        list
      }
    ];

    await MailingListSubscription.insertMany(oldSubscriptions);
    await up();

    const expectedSubscriptions = [
      {
        email: "bOb@yopmail.com",
        list
      },
      {
        email: "ross@yopmail.com",
        list
      },
      {
        email: "joey@yopmail.com",
        list
      }
    ];
    const updatedSubscriptions = await MailingListSubscription.find(
      {},
      { _id: 0, email: 1, list: 1 }
    );

    expect(updatedSubscriptions.length).toBe(expectedSubscriptions.length);
    updatedSubscriptions.forEach((sub, i) => {
      expect(sub.toObject()).toEqual(expectedSubscriptions[i]);
    });

    const indexes = await MailingListSubscription.collection.indexes();
    expect(indexes[1]).toEqual({
      v: 2,
      unique: true,
      key: { email: 1, list: 1 },
      name: "email_1_list_1",
      ns: "qhacks-dashboard-test.mailinglistsubscriptions",
      collation: {
        locale: "en",
        caseLevel: false,
        caseFirst: "off",
        strength: 2,
        numericOrdering: false,
        alternate: "non-ignorable",
        maxVariable: "punct",
        normalization: false,
        backwards: false,
        version: "57.1"
      }
    });
  });

  it("works in the downwards direction", async () => {
    down();
    const indexes = await MailingListSubscription.collection.indexes();
    expect(indexes[1]).toEqual({
      v: 2,
      unique: true,
      key: { email: 1, list: 1 },
      name: "email_1_list_1",
      ns: "qhacks-dashboard-test.mailinglistsubscriptions"
    });
  });
});
