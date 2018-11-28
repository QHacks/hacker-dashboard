const { gql } = require("../../../config/mock-api");
const {
  User,
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
        application(event: "qhacks-2019") {
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
        createApplication(event: "qhacks-2019", input: {
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
});
