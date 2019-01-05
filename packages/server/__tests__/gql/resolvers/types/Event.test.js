const { db, graphqlClient } = global;
const { gql } = require("apollo-server-express");

const GET_ALL_EVENTS_QUERY = gql`
  query getAllEvents {
    events {
      name
      slug
      eventLogoUrl
    }
  }
`;

const GET_EVENT_BY_ID_QUERY = gql`
  query getEventByID($id: ID!) {
    event(id: $id) {
      name
      slug
      eventLogoUrl
    }
  }
`;

const GET_EVENT_BY_SLUG_QUERY = gql`
  query getEventBySlug($slug: String!) {
    eventBySlug(slug: $slug) {
      name
      slug
      eventLogoUrl
    }
  }
`;

const CREATE_NEW_EVENT_MUTATION = gql`
  mutation createNewEvent($input: EventInput!) {
    eventCreate(input: $input) {
      event {
        name
        slug
        eventLogoUrl
      }
    }
  }
`;

const UPDATE_EVENT_BY_ID_MUTATION = gql`
  mutation updateEventByID($id: ID!, $input: EventInput!) {
    eventUpdate(id: $id, input: $input) {
      event {
        name
        slug
        eventLogoUrl
      }
    }
  }
`;

const UPDATE_EVENT_BY_SLUG_MUTATION = gql`
  mutation udpateEventBySlug($slug: String!, $input: EventInput!) {
    eventUpdateBySlug(slug: $slug, input: $input) {
      event {
        name
        slug
        eventLogoUrl
      }
    }
  }
`;

const DELETE_EVENT_BY_ID_MUTATION = gql`
  mutation deleteEventByID($id: ID!) {
    eventDelete(id: $id) {
      deletedEventId
    }
  }
`;

const DELETE_EVENT_BY_SLUG_MUTATION = gql`
  mutation deleteEventBySlug($slug: String!) {
    eventDeleteBySlug(slug: $slug) {
      deletedEventSlug
    }
  }
`;

describe("Event Type", () => {
  it("retrieves all events through the events query", async () => {
    const { query } = await graphqlClient();

    const res = await query({ query: GET_ALL_EVENTS_QUERY });
    const expectedEvents = [
      {
        name: "qhacks-2019",
        slug: "qhacks-2019",
        eventLogoUrl: "http://digitalocean.com/qhacks.jpg"
      },
      {
        name: "yophacks-2019",
        slug: "yophacks-2019",
        eventLogoUrl: "http://digitalocean.com/yophacks.jpg"
      }
    ];

    expectedEvents.forEach((event, i) =>
      expect(res.data.events[i]).toEqual(event)
    );
  });

  it("retrieves a single event by identifier through event query", async () => {
    const qhacksEvent = await db.Event.findOne({
      where: { slug: "qhacks-2019" }
    });

    const { query } = await graphqlClient();

    const res = await query({
      query: GET_EVENT_BY_ID_QUERY,
      variables: { id: qhacksEvent.id }
    });

    expect(res.data.event).toEqual({
      name: "qhacks-2019",
      slug: "qhacks-2019",
      eventLogoUrl: "http://digitalocean.com/qhacks.jpg"
    });
  });

  it("retrieves an event by slug through eventBySlug query", async () => {
    const { query } = await graphqlClient();

    const res = await query({
      query: GET_EVENT_BY_SLUG_QUERY,
      variables: { slug: "yophacks-2019" }
    });

    expect(res.data.eventBySlug).toEqual({
      name: "yophacks-2019",
      slug: "yophacks-2019",
      eventLogoUrl: "http://digitalocean.com/yophacks.jpg"
    });
  });

  it("creates a new event through eventCreate mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: CREATE_NEW_EVENT_MUTATION,
      variables: {
        input: {
          name: "testhacks-2019",
          slug: "testhacks-2019",
          requiresApplication: false,
          hasProjects: false,
          startDate: "2019-01-04T20:58:58+00:00",
          endDate: "2019-01-04T20:58:58+00:00",
          eventLogoUrl: "http://digitalocean.com/testhacks.jpg"
        }
      }
    });

    expect(res.data.eventCreate.event).toEqual({
      name: "testhacks-2019",
      slug: "testhacks-2019",
      eventLogoUrl: "http://digitalocean.com/testhacks.jpg"
    });

    const eventInDB = await db.Event.findOne({
      where: { slug: "testhacks-2019" }
    });

    expect(eventInDB).toEqual(
      expect.objectContaining({
        name: "testhacks-2019",
        slug: "testhacks-2019",
        eventLogoUrl: "http://digitalocean.com/testhacks.jpg"
      })
    );
  });

  it("updates an existing event by identifier through eventUpdate mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });
    const qhacks = await db.Event.findOne({ where: { slug: "qhacks-2019" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: UPDATE_EVENT_BY_ID_MUTATION,
      variables: {
        id: qhacks.id,
        input: {
          name: "joeyhacks-2020",
          slug: "joeyhacks-2020",
          eventLogoUrl: "joey.jpg"
        }
      }
    });

    expect(res.data.eventUpdate.event).toEqual({
      name: "joeyhacks-2020",
      slug: "joeyhacks-2020",
      eventLogoUrl: "joey.jpg"
    });

    const updatedEventInDB = await db.Event.findByPk(qhacks.id);

    expect(updatedEventInDB).toEqual(
      expect.objectContaining({
        name: "joeyhacks-2020",
        slug: "joeyhacks-2020",
        eventLogoUrl: "joey.jpg"
      })
    );
  });

  it("updates an existing event by slug through eventUpdateBySlug mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: UPDATE_EVENT_BY_SLUG_MUTATION,
      variables: {
        slug: "yophacks-2019",
        input: {
          name: "joeyhacks-2020",
          eventLogoUrl: "joey.jpg"
        }
      }
    });

    expect(res.data.eventUpdateBySlug.event).toEqual({
      name: "joeyhacks-2020",
      slug: "yophacks-2019",
      eventLogoUrl: "joey.jpg"
    });

    const updatedEventInDB = await db.Event.findOne({
      where: { slug: "yophacks-2019" }
    });

    expect(updatedEventInDB).toEqual(
      expect.objectContaining({
        name: "joeyhacks-2020",
        slug: "yophacks-2019",
        eventLogoUrl: "joey.jpg"
      })
    );
  });

  it("deletes an event by identifier through eventDelete mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });
    const qhacks = await db.Event.findOne({ where: { slug: "qhacks-2019" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: DELETE_EVENT_BY_ID_MUTATION,
      variables: { id: qhacks.id }
    });

    expect(res.data.eventDelete.deletedEventId).toBe(qhacks.id);

    const deletedEvent = await db.Event.findByPk(qhacks.id);

    expect(deletedEvent).toBeNull();
  });

  it("deletes an event by slug through eventDeleteBySlug mutation", async () => {
    const admin = await db.User.findOne({ where: { email: "admin@test.com" } });

    const { mutate } = await graphqlClient(admin);

    const res = await mutate({
      mutation: DELETE_EVENT_BY_SLUG_MUTATION,
      variables: {
        slug: "yophacks-2019"
      }
    });

    expect(res.data.eventDeleteBySlug.deletedEventSlug).toBe("yophacks-2019");

    const deletedEvent = await db.Event.findOne({
      where: { slug: "yophacks-2019" }
    });

    expect(deletedEvent).toBeNull();
  });
});
