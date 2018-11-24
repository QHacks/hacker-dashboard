const {
  ApplicationReview,
  Application,
  User
} = require("../../config/mock-db");

describe("ApplicationReview Model", () => {
  it("saves with a uuid", async () => {
    const { id: reviewerId } = await User.findOne({
      where: { email: "ross.hill@rosshill.ca" }
    });

    const { id: applicationId } = await Application.findOne({});
    const { id } = await ApplicationReview.create({
      score: 5,
      applicationId,
      reviewerId
    });

    expect(id).toBeDefined();
  });

  it("validates minimum on score", async (done) => {
    const { id: reviewerId } = await User.findOne({
      where: { email: "ross.hill@rosshill.ca" }
    });

    const { id: applicationId } = await Application.findOne({});
    ApplicationReview.create({
      score: -1,
      applicationId,
      reviewerId
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation min on score failed");
      done();
    });
  });

  it("validates maximum on score", async (done) => {
    const { id: reviewerId } = await User.findOne({
      where: { email: "ross.hill@rosshill.ca" }
    });

    const { id: applicationId } = await Application.findOne({});
    ApplicationReview.create({
      score: 6,
      applicationId,
      reviewerId
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation max on score failed");
      done();
    });
  });

  it("has a unique index on reviewers and applications", async (done) => {
    const { id: reviewerId } = await User.findOne({
      where: { email: "ross.hill@rosshill.ca" }
    });

    const { id: applicationId } = await Application.findOne({});
    ApplicationReview.bulkCreate([
      {
        score: 3,
        applicationId,
        reviewerId
      },
      {
        score: 4,
        applicationId,
        reviewerId
      }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("applicationId must be unique");
      done();
    });
  });
});