const { gql } = require("apollo-server-express");

const { db, graphqlClient } = global;

const GET_ALL_MAILING_LISTS_QUERY = gql`
  query GetAllMailingLists {
    mailingLists {
      name
      slug
    }
  }
`;

const GET_MAILING_LISTS_BY_EVENT_QUERY = gql`
  query GetMailingListsByEvent($eventSlug: String!) {
    mailingListsByEvent(eventSlug: $eventSlug) {
      name
      slug
    }
  }
`;

const GET_MAILING_LIST_BY_ID_QUERY = gql`
  query GetMailingListById($id: ID!) {
    mailingList(id: $id) {
      name
      slug
    }
  }
`;

const GET_MAILNG_LIST_BY_ID_WITH_EVENT_QUERY = gql`
  query GetMailingListByIdWithEvent($id: ID!) {
    mailingList(id: $id) {
      event {
        slug
      }
    }
  }
`;

const GET_MAILING_LIST_BY_SLUG_QUERY = gql`
  query GetMailingListBySlug($slug: String!) {
    mailingListBySlug(slug: $slug) {
      name
      slug
    }
  }
`;

const GET_MAILING_LIST_BY_SLUG_WITH_SUBSCRIBERS_QUERY = gql`
  query GetMailingListBySlug($slug: String!) {
    mailingListBySlug(slug: $slug) {
      subscribers {
        email
      }
    }
  }
`;

const CREATE_MAILING_LIST_MUTATION = gql`
  mutation CreateMailingList($eventSlug: String!, $input: MailingListInput!) {
    mailingListCreate(eventSlug: $eventSlug, input: $input) {
      mailingList {
        name
        slug
      }
    }
  }
`;

const UPDATE_MAILING_LIST_BY_ID_MUTATION = gql`
  mutation UpdateMailingListById($id: ID!, $input: MailingListInput!) {
    mailingListUpdate(id: $id, input: $input) {
      mailingList {
        name
        slug
      }
    }
  }
`;

const UPDATE_MAILING_LIST_BY_SLUG_MUTATION = gql`
  mutation UpdateMailingListBySlug($slug: String!, $input: MailingListInput!) {
    mailingListUpdateBySlug(slug: $slug, input: $input) {
      mailingList {
        name
        slug
      }
    }
  }
`;

const DELETE_MAILING_LIST_BY_ID_MUTATION = gql`
  mutation DeleteMailingListById($id: ID!) {
    mailingListDelete(id: $id) {
      deletedMailingListId
    }
  }
`;

const DELETE_MAILING_LIST_BY_SLUG_MUTATION = gql`
  mutation DeleteMailingListBySlug($slug: String!) {
    mailingListDeleteBySlug(slug: $slug) {
      deletedMailingListSlug
    }
  }
`;

describe("MailingList Type", () => {
  it("returns all mailing lists through mailingLists query", async () => {
    const { query } = await graphqlClient();

    const res = await query({ query: GET_ALL_MAILING_LISTS_QUERY });

    const expectedFields = [
      {
        name: "qhacks-list",
        slug: "qhacks-list"
      },
      {
        name: "yophacks-list",
        slug: "yophacks-list"
      }
    ];

    expectedFields.forEach((event, i) => {
      expect(res.data.mailingLists[i]).toEqual(event);
    });
  });

  it("returns a mailing list by event slug through mailingListByEvent query", async () => {
    const { query } = await graphqlClient();

    const res = await query({
      query: GET_MAILING_LISTS_BY_EVENT_QUERY,
      variables: { eventSlug: "qhacks-2019" }
    });

    expect(res.data.mailingListsByEvent).toHaveLength(1);
    expect(res.data.mailingListsByEvent[0]).toEqual({
      name: "qhacks-list",
      slug: "qhacks-list"
    });
  });

  it("returns a mailing list by identifier through mailingList query", async () => {
    const qhacksList = await db.MailingList.findOne({
      where: { slug: "qhacks-list" }
    });

    const { query } = await graphqlClient();

    const res = await query({
      query: GET_MAILING_LIST_BY_ID_QUERY,
      variables: { id: qhacksList.id }
    });

    expect(res.data.mailingList).toEqual({
      name: "qhacks-list",
      slug: "qhacks-list"
    });
  });

  it("returns a mailing list by slug through mailingListBySlug query", async () => {
    const { query } = await graphqlClient();

    const res = await query({
      query: GET_MAILING_LIST_BY_SLUG_QUERY,
      variables: { slug: "yophacks-list" }
    });

    expect(res.data.mailingListBySlug).toEqual({
      name: "yophacks-list",
      slug: "yophacks-list"
    });
  });

  it("includes an event field with information about the associated event", async () => {
    const qhacksList = await db.MailingList.findOne({
      where: { slug: "qhacks-list" }
    });

    const { query } = await graphqlClient();

    const res = await query({
      query: GET_MAILNG_LIST_BY_ID_WITH_EVENT_QUERY,
      variables: { id: qhacksList.id }
    });

    expect(res.data.mailingList.event.slug).toBe("qhacks-2019");
  });

  it("includes a subscribers field with information about the associated subscribers", async () => {
    const yophacksList = await db.MailingList.findOne({
      where: { slug: "yophacks-list" }
    });

    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    await db.MailingListSubscription.create({
      mailingListId: yophacksList.id,
      email: "admin@test.com"
    });

    const { query } = await graphqlClient(admin);

    const res = await query({
      query: GET_MAILING_LIST_BY_SLUG_WITH_SUBSCRIBERS_QUERY,
      variables: { slug: "yophacks-list" }
    });

    expect(res.data.mailingListBySlug.subscribers).toHaveLength(1);
    expect(res.data.mailingListBySlug.subscribers[0].email).toBe(
      "admin@test.com"
    );
  });

  it("creates a mailing list by mailingListCreate mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: CREATE_MAILING_LIST_MUTATION,
      variables: {
        eventSlug: "yophacks-2019",
        input: {
          name: "new-list",
          slug: "new-list"
        }
      }
    });

    expect(res.data.mailingListCreate.mailingList).toEqual({
      name: "new-list",
      slug: "new-list"
    });

    const newMailingList = await db.MailingList.findOne({
      where: { slug: "new-list" }
    });

    expect(newMailingList.name).toBe("new-list");
  });

  it("updates a mailing list by identifier through mailingListUpdate mutation", async () => {
    const yophacksList = await db.MailingList.findOne({
      where: { slug: "yophacks-list" }
    });
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: UPDATE_MAILING_LIST_BY_ID_MUTATION,
      variables: {
        id: yophacksList.id,
        input: {
          name: "test-list",
          slug: "test-list"
        }
      }
    });

    expect(res.data.mailingListUpdate.mailingList).toEqual({
      name: "test-list",
      slug: "test-list"
    });

    const updatedMailingList = await db.MailingList.findByPk(yophacksList.id);

    expect(updatedMailingList).toEqual(
      expect.objectContaining({
        name: "test-list",
        slug: "test-list"
      })
    );
  });

  it("updates a mailing list by identifier through mailingListUpdate mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: UPDATE_MAILING_LIST_BY_SLUG_MUTATION,
      variables: {
        slug: "qhacks-list",
        input: {
          name: "test-list",
          slug: "test-list"
        }
      }
    });

    expect(res.data.mailingListUpdateBySlug.mailingList).toEqual({
      name: "test-list",
      slug: "test-list"
    });

    const updatedMailingList = await db.MailingList.findOne({
      where: { slug: "test-list" }
    });

    expect(updatedMailingList).toEqual(
      expect.objectContaining({
        name: "test-list",
        slug: "test-list"
      })
    );
  });

  it("deletes a mailing list by identifier through mailingListDelete mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });
    const qhacksList = await db.MailingList.findOne({
      where: { slug: "qhacks-list" }
    });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: DELETE_MAILING_LIST_BY_ID_MUTATION,
      variables: { id: qhacksList.id }
    });

    expect(res.data.mailingListDelete.deletedMailingListId).toBe(qhacksList.id);

    const deletedMailingList = await db.MailingList.findByPk(qhacksList.id);

    expect(deletedMailingList).toBeNull();
  });

  it("deletes a mailing list by slug through mailingListDeleteBySlug mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: DELETE_MAILING_LIST_BY_SLUG_MUTATION,
      variables: { slug: "yophacks-list" }
    });

    expect(res.data.mailingListDeleteBySlug.deletedMailingListSlug).toBe(
      "yophacks-list"
    );

    const deletedMailingList = await db.MailingList.findOne({
      where: { slug: "yophacks-list" },
      include: {
        model: db.Event,
        where: { slug: "yophacks-2019" }
      }
    });

    expect(deletedMailingList).toBeNull();
  });
});
