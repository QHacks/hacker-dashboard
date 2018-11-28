const { gql } = require("../../../config/mock-api");
const {
  User,
  Event,
  Application,
  ApplicationField
} = require("../../../config/mock-db");

describe("Application Type", () => {
  it("returns the current user's application", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "jmichaelt98@gmail.com" }
    });

    const { data: response } = await gql(
      userId,
      `
      {
        application(eventSlug: "qhacks-2019") {
          status
          response {
            label
            answer
          }
        }
      }
    `
    );

    expect(response.application.status).toBe("APPLIED");
    expect(response.application.response).toHaveLength(3);

    response.application.response.forEach(({ label, answer }) => {
      expect(label).toBeDefined();
      expect(label).toContain("Field");
      expect(answer).toBeDefined();
      expect(answer).toContain("Test answer");
    });
  });

  it("creates a new application for a user", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    const { data } = await gql(
      userId,
      `
      mutation {
        createApplication(eventSlug: "qhacks-2019", input: {
          response: [
            {
              label: "Field 1",
              answer: "answer1"
            },
            {
              label: "Field 2",
              answer: "answer2"
            },
            {
              label: "Field 3",
              answer: "answer3"
            }
          ]
        }) {
          application {
            status
            response {
              label
              answer
            }
          }
        }
      }
    `
    );

    expect(data.createApplication.application.status).toBe("APPLIED");
    expect(data.createApplication.application.response).toHaveLength(3);

    data.createApplication.application.response.forEach(
      ({ label, answer }, i) => {
        expect(label).toBe(`Field ${i + 1}`);
        expect(answer).toBe(`answer${i + 1}`);
      }
    );

    const dbResponse = await Application.findOne({
      where: { userId },
      include: ApplicationField
    });

    expect(dbResponse.ApplicationFields).toHaveLength(3);
    dbResponse.ApplicationFields.forEach((field) => {
      expect(field.ApplicationFieldResponse.answer).toContain("answer");
    });
  });

  it("validates form fields when creating an applciation", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    const { data, errors } = await gql(
      userId,
      `
      mutation {
        createApplication(eventSlug: "qhacks-2019", input: {
          response: [
            {
              label: "Field 1",
              answer: "answer1"
            },
            {
              label: "Field 2",
              answer: "answer2"
            },
            {
              label: "Invalid Field",
              answer: "answer3"
            }
          ]
        }) {
          application {
            status
            response {
              label
              answer
            }
          }
        }
      }
    `
    );

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      "Invalid Field is not a valid field for qhacks-2019"
    );
  });

  it("validates if an event requires applications", async () => {
    await Event.create({
      name: "yophacks-2019",
      slug: "yophacks-2019",
      startDate: new Date("2019-02-01T19:00Z"),
      endDate: new Date("2019-02-03T19:00Z"),
      requiresApplication: false,
      hasProjectSubmissions: true,
      projectSubmissionDate: new Date("2018-02-03T14:00Z"),
      eventLogoUrl: "http://digitalocean.com/yophacks.jpg"
    });

    const { id: userId } = await User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    const { data, errors } = await gql(
      userId,
      `
      mutation {
        createApplication(eventSlug: "yophacks-2019", input: {
          response: [
            {
              label: "Field 1",
              answer: "answer1"
            },
            {
              label: "Field 2",
              answer: "answer2"
            }
          ]
        }) {
          application {
            status
            response {
              label
              answer
            }
          }
        }
      }
    `
    );

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      "yophacks-2019 does not require applications"
    );
  });

  it("validates that the application has been submitted within the allowed dates", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    await Event.create({
      name: "yophacks-2019",
      slug: "yophacks-2019",
      startDate: new Date("2019-02-01T19:00Z"),
      endDate: new Date("2019-02-03T19:00Z"),
      requiresApplication: true,
      applicationOpenDate: new Date("1970-01-01"),
      applicationCloseDate: new Date("1970-01-02"),
      hasProjectSubmissions: true,
      projectSubmissionDate: new Date("2018-02-03T14:00Z"),
      eventLogoUrl: "http://digitalocean.com/yophacks.jpg"
    });

    const { data, errors } = await gql(
      userId,
      `
      mutation {
        createApplication(eventSlug: "yophacks-2019", input: {
          response: [
            {
              label: "Field 1",
              answer: "answer1"
            },
            {
              label: "Field 2",
              answer: "answer2"
            }
          ]
        }) {
          application {
            status
            response {
              label
              answer
            }
          }
        }
      }
    `
    );

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      "yophacks-2019 is not accepting applications at this time"
    );
  });

  it("creates a new application for a user", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    const { data } = await gql(
      userId,
      `
      mutation {
        createApplication(eventSlug: "qhacks-2019", input: {
          response: [
            {
              label: "Field 1",
              answer: "answer1"
            },
            {
              label: "Field 2",
              answer: "answer2"
            },
            {
              label: "Field 3",
              answer: "answer3"
            }
          ]
        }) {
          application {
            status
            response {
              label
              answer
            }
          }
        }
      }
    `
    );

    expect(data.createApplication.application.status).toBe("APPLIED");
    expect(data.createApplication.application.response).toHaveLength(3);

    data.createApplication.application.response.forEach(
      ({ label, answer }, i) => {
        expect(label).toBe(`Field ${i + 1}`);
        expect(answer).toBe(`answer${i + 1}`);
      }
    );

    const dbResponse = await Application.findOne({
      where: { userId },
      include: ApplicationField
    });

    expect(dbResponse.ApplicationFields).toHaveLength(3);
    dbResponse.ApplicationFields.forEach((field) => {
      expect(field.ApplicationFieldResponse.answer).toContain("answer");
    });
  });

  it("validates required sign up fields", async () => {
    const { id: userId } = await User.findOne({
      where: { email: "hacker1@gmail.com" }
    });

    // Missing Field 3, which is required
    const { data, errors } = await gql(
      userId,
      `
      mutation {
        createApplication(eventSlug: "qhacks-2019", input: {
          response: [
            {
              label: "Field 1",
              answer: "answer1"
            },
            {
              label: "Field 2",
              answer: "answer2"
            }
          ]
        }) {
          application {
            status
            response {
              label
              answer
            }
          }
        }
      }
    `
    );

    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe("Field 3 is a required field!");
  });
});
