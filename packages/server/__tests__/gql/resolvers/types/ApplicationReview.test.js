const { gql } = require("apollo-server-express");
const { db, graphqlClient } = global;

const ALL_APPLICATIONS_QUERY = gql`
  query GetAllApplications($eventSlug: String!) {
    applications(eventSlug: $eventSlug) {
      id
      reviews {
        score
        reviewedBy {
          firstName
        }
      }
    }
  }
`;

const CREATE_APPLICATION_REVIEW_MUTATION = gql`
  mutation CreateApplicationReviewMutation(
    $applicationId: ID!
    $input: ApplicationReviewInput!
  ) {
    applicationReviewCreate(applicationId: $applicationId, input: $input) {
      applicationReview {
        score
        reviewedAt
      }
    }
  }
`;

describe("ApplicationReview Type", () => {
  it("is shown as a field from the Application type for admins", async () => {
    const application = await db.Application.findOne();
    const admin = await db.User.findOne({
      where: { email: "admin@test.com" }
    });

    await db.ApplicationReview.create({
      applicationId: application.id,
      reviewerId: admin.id,
      score: 4
    });

    const { query } = await graphqlClient(admin);
    const { data } = await query({
      query: ALL_APPLICATIONS_QUERY,
      variables: { eventSlug: "qhacks-2019" }
    });

    expect(data.applications).toBeDefined();
    expect(data.applications).toHaveLength(1);
    expect(data.applications[0].reviews).toBeDefined();
    expect(data.applications[0].reviews).toHaveLength(1);
    expect(data.applications[0].reviews[0]).toEqual({
      reviewedBy: { firstName: "Ross" },
      score: 4
    });
  });

  it("is inaccessible to non-admins", async () => {
    const application = await db.Application.findOne();
    const admin = await db.User.findOne({
      where: { email: "admin@test.com" }
    });

    await db.ApplicationReview.create({
      applicationId: application.id,
      reviewerId: admin.id,
      score: 4
    });

    const { query } = await graphqlClient();
    const { data, errors } = await query({
      query: ALL_APPLICATIONS_QUERY,
      variables: { eventSlug: "qhacks-2019" }
    });

    expect(data).toHaveProperty("applications");
    expect(data.applications).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toEqual(
      expect.objectContaining({
        name: "GraphQLError",
        message:
          "Not authorized! You are not the required user role to perform this operation."
      })
    );
  });

  it("creates new reviews via applicationReviewCreate mutation", async () => {
    const application = await db.Application.findOne();
    const admin = await db.User.findOne({
      where: { email: "admin@test.com" }
    });

    const { mutate } = await graphqlClient(admin);
    const res = await mutate({
      mutation: CREATE_APPLICATION_REVIEW_MUTATION,
      variables: { applicationId: application.id, input: { score: 2 } }
    });

    const { data } = res;

    expect(data.applicationReviewCreate).toBeDefined();
    expect(data.applicationReviewCreate.applicationReview).toBeDefined();
    expect(data.applicationReviewCreate.applicationReview.score).toBe(2);
    expect(
      data.applicationReviewCreate.applicationReview.reviewedAt
    ).toBeLessThanOrEqual(Date.now());
  });
});
