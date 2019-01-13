const { gql } = require("apollo-server-express");

const { db, graphqlClient } = global;

const GET_USER_APPLICATION_FOR_EVENT = gql`
  query GetUserApplication($eventSlug: String!) {
    application(eventSlug: $eventSlug) {
      status
      responses {
        label
        answer
      }
    }
  }
`;

const GET_ALL_APPLICATIONS_FOR_EVENT = gql`
  query GetAllApplications($eventSlug: String!, $after: Date, $first: Int) {
    applications(eventSlug: $eventSlug, after: $after, first: $first) {
      id
      status
    }
  }
`;

const CREATE_APPLICATION_FOR_EVENT = gql`
  mutation CreateApplicationForEvent(
    $eventSlug: String!
    $input: ApplicationInput!
  ) {
    applicationCreate(eventSlug: $eventSlug, input: $input) {
      application {
        status
        responses {
          label
          answer
        }
      }
    }
  }
`;

describe("Application Type", () => {
  it("queries for the current users application to an event", async () => {
    const { query } = await graphqlClient();

    const res = await query({
      query: GET_USER_APPLICATION_FOR_EVENT,
      variables: {
        eventSlug: "qhacks-2019"
      }
    });

    const { data } = res;

    expect(data.application.status).toBe("APPLIED");
    expect(data.application.responses).toHaveLength(3);

    data.application.responses.forEach(({ label, answer }) => {
      expect(label).toBeDefined();
      expect(label).toContain("Field");
      expect(answer).toBeDefined();
      expect(answer).toContain("Test answer");
    });
  });

  it("creates a new application for a user", async () => {
    const user = await db.User.findOne({
      where: { email: "hacker1@test.com" }
    });

    const { mutate } = await graphqlClient(user);

    const res = await mutate({
      mutation: CREATE_APPLICATION_FOR_EVENT,
      variables: {
        eventSlug: "qhacks-2019",
        input: {
          responses: [
            {
              label: "Field 1",
              answer: "Answer 1"
            },
            {
              label: "Field 2",
              answer: "Answer 2"
            },
            {
              label: "Field 3",
              answer: "Answer 3"
            }
          ]
        }
      }
    });

    const { data } = res;

    expect(data.applicationCreate.application.status).toBe("APPLIED");
    expect(data.applicationCreate.application.responses).toHaveLength(3);

    data.applicationCreate.application.responses.forEach(
      ({ label, answer }, i) => {
        expect(label).toBe(`Field ${i + 1}`);
        expect(answer).toBe(`Answer ${i + 1}`);
      }
    );

    const application = await db.Application.findOne({
      where: { userId: user.id },
      include: db.ApplicationField
    });

    expect(application.ApplicationFields).toHaveLength(3);

    application.ApplicationFields.forEach((field) => {
      expect(field.ApplicationFieldResponse.answer).toContain("Answer");
    });
  });

  it("validates form fields when creating an applciation", async () => {
    const user = await db.User.findOne({
      where: { email: "hacker1@test.com" }
    });

    const { mutate } = await graphqlClient(user);

    const { data, errors } = await mutate({
      mutation: CREATE_APPLICATION_FOR_EVENT,
      variables: {
        eventSlug: "qhacks-2019",
        input: {
          responses: [
            {
              label: "Field 1",
              answer: "Answer 1"
            },
            {
              label: "Field 2",
              answer: "Answer 2"
            },
            {
              label: "Invalid Field",
              answer: "Answer 3"
            }
          ]
        }
      }
    });

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      "Invalid Field is not a valid field for the event with the slug qhacks-2019!"
    );
  });

  it("validates if an event requires applications", async () => {
    const user = await db.User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    const { mutate } = await graphqlClient(user);

    const { data, errors } = await mutate({
      mutation: CREATE_APPLICATION_FOR_EVENT,
      variables: {
        eventSlug: "yophacks-2019",
        input: {
          responses: [
            {
              label: "Field 1",
              answer: "Answer 1"
            },
            {
              label: "Field 2",
              answer: "Answer 2"
            },
            {
              label: "Field 3",
              answer: "Answer 3"
            }
          ]
        }
      }
    });

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      "The event with the slug yophacks-2019 does not require applications!"
    );
  });

  it("validates that the application has been submitted within the allowed dates", async () => {
    const user = await db.User.findOne({
      where: { email: "hacker1@test.com" }
    });

    await db.Event.update(
      {
        requiresApplication: true,
        applicationCloseDate: new Date(1970, 1, 1)
      },
      { where: { slug: "yophacks-2019" } }
    );

    const { mutate } = await graphqlClient(user);

    const { data, errors } = await mutate({
      mutation: CREATE_APPLICATION_FOR_EVENT,
      variables: {
        eventSlug: "yophacks-2019",
        input: {
          responses: [
            {
              label: "Field 1",
              answer: "Answer 1"
            },
            {
              label: "Field 2",
              answer: "Answer 2"
            },
            {
              label: "Invalid Field",
              answer: "Answer 3"
            }
          ]
        }
      }
    });

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      "The event with the slug yophacks-2019 is not accepting applications at this time!"
    );
  });

  it("validates required sign up fields", async () => {
    const user = await db.User.findOne({
      where: { email: "hacker1@test.com" }
    });

    const { mutate } = await graphqlClient(user);

    const { data, errors } = await mutate({
      mutation: CREATE_APPLICATION_FOR_EVENT,
      variables: {
        eventSlug: "qhacks-2019",
        input: {
          responses: [
            {
              label: "Field 1",
              answer: "Answer 1"
            },
            {
              label: "Field 2",
              answer: "Answer 2"
            }
          ]
        }
      }
    });

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe("Field 3 is a required field!");
  });

  it("finds all applications for an event, with pagination", async () => {
    const event = await db.Event.findOne({});
    const hacker = await db.User.findOne({
      where: { email: "hacker1@test.com" }
    });
    const admin = await db.User.findOne({
      where: { email: "admin@test.com" }
    });

    const newApplication = await db.Application.findOne({});
    const oldApplication = await db.Application.create({
      userId: hacker.id,
      eventId: event.id,
      status: "APPLIED",
      submissionDate: new Date(1980, 1, 1)
    });

    const { query } = await graphqlClient(admin);

    // Query for the existing application

    const { data: response1 } = await query({
      query: GET_ALL_APPLICATIONS_FOR_EVENT,
      variables: {
        eventSlug: "qhacks-2019",
        first: 1,
        after: new Date(1, 1, 1)
      }
    });

    expect(response1.applications).toBeDefined();
    expect(response1.applications).toHaveLength(1);
    expect(response1.applications[0]).toEqual(
      expect.objectContaining({
        status: "APPLIED",
        id: oldApplication.id
      })
    );

    // Query for the newly created application

    const { data: response2 } = await query({
      query: GET_ALL_APPLICATIONS_FOR_EVENT,
      variables: {
        eventSlug: "qhacks-2019",
        first: 1,
        after: oldApplication.submissionDate
      }
    });

    expect(response2.applications).toBeDefined();
    expect(response2.applications).toHaveLength(1);
    expect(response2.applications[0]).toEqual(
      expect.objectContaining({ status: "APPLIED", id: newApplication.id })
    );
  });
});
