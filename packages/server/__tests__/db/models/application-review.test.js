const { db } = global;

describe("ApplicationReview Model", () => {
  it("validates minimum on score attribute", async () => {
    const { id: reviewerId } = await db.User.findOne({
      where: { email: "admin@test.com" }
    });
    const { id: applicationId } = await db.Application.findOne({});

    try {
      await db.ApplicationReview.create({
        score: -1,
        applicationId,
        reviewerId
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation min on score failed");
    }
  });

  it("validates maximum on score attribute", async () => {
    const { id: reviewerId } = await db.User.findOne({
      where: { email: "admin@test.com" }
    });
    const { id: applicationId } = await db.Application.findOne({});

    try {
      await db.ApplicationReview.create({
        score: 6,
        applicationId,
        reviewerId
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation max on score failed");
    }
  });

  it("has a unique index on reviewer and application", async () => {
    const { id: reviewerId } = await db.User.findOne({
      where: { email: "admin@test.com" }
    });
    const { id: applicationId } = await db.Application.findOne({});

    try {
      await db.ApplicationReview.bulkCreate([
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
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("reviewerId must be unique");
    }
  });
});
