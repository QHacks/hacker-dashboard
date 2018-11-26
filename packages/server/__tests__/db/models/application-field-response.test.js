const {
  User,
  Event,
  Application,
  ApplicationField,
  ApplicationFieldResponse
} = require("../../config/mock-db");

describe("ApplicationFieldResponse Model", () => {
  it("prevents duplicates", async (done) => {
    const { id: eventId } = await Event.findOne({});
    const { id: userId } = await User.findOne();
    const { id: applicationId } = await Application.create({
      status: "APPLIED",
      eventId,
      userId
    });
    const { id: applicationFieldId } = await ApplicationField.create({
      eventId,
      type: "TEXT_INPUT",
      label: "What's the biggest event of 2019"
    });
    const answer = "qhacks ;)";
    ApplicationFieldResponse.bulkCreate([
      {
        answer,
        applicationFieldId,
        applicationId
      },
      {
        answer,
        applicationFieldId,
        applicationId
      }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("applicationId must be unique");
      done();
    });
  });
});
