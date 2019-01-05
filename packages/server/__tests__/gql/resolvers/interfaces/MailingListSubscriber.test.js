const { gql } = require("apollo-server-express");

const { db, graphqlClient } = global;

const CREATE_MAILING_LIST_SUBSCRIBER_MUTATION = gql`
  mutation createMailingListSubscriber(
    $eventSlug: String!
    $mailingListSlug: String!
    $input: MailingListSubscriberInput!
  ) {
    mailingListSubscriberCreate(
      eventSlug: $eventSlug
      mailingListSlug: $mailingListSlug
      input: $input
    ) {
      subscriber {
        email
      }
    }
  }
`;

const DELETE_MAILING_LIST_SUBSCRIBER_MUTATION = gql`
  mutation deleteMailingListSubscriber(
    $eventSlug: String!
    $mailingListSlug: String!
    $email: String!
  ) {
    mailingListSubscriberDelete(
      eventSlug: $eventSlug
      mailingListSlug: $mailingListSlug
      email: $email
    ) {
      deletedSubscriberEmail
    }
  }
`;

describe("MailingListSubscriber Interface", () => {
  it("creates new mailing list subscriptions through mailingListSubscriberCreate", async () => {
    const { mutate } = await graphqlClient();

    const res = await mutate({
      mutation: CREATE_MAILING_LIST_SUBSCRIBER_MUTATION,
      variables: {
        eventSlug: "yophacks-2019",
        mailingListSlug: "yophacks-list",
        input: { email: "test@testmail.com" }
      }
    });

    expect(res.data.mailingListSubscriberCreate.subscriber.email).toBe(
      "test@testmail.com"
    );

    const newSubscriptions = await db.MailingListSubscription.findAll({
      include: [
        {
          model: db.MailingList,
          where: { slug: "yophacks-list" }
        }
      ]
    });

    expect(newSubscriptions).toHaveLength(1);
    expect(newSubscriptions[0].email).toBe("test@testmail.com");
  });

  it("deletes mailing list subscriptions through mailingListSubscriberDelete mutation", async () => {
    const { mutate } = await graphqlClient();

    const res = await mutate({
      mutation: DELETE_MAILING_LIST_SUBSCRIBER_MUTATION,
      variables: {
        eventSlug: "qhacks-2019",
        mailingListSlug: "qhacks-list",
        email: "subscriber@test.com"
      }
    });

    expect(res.data.mailingListSubscriberDelete.deletedSubscriberEmail).toBe(
      "subscriber@test.com"
    );

    const deletedSubscriber = await db.MailingListSubscription.findOne({
      where: {
        email: "subscriber@test.com"
      }
    });

    expect(deletedSubscriber).toBeNull();
  });
});
