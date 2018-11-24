const {
  User,
  Event,
  Application,
  ApplicationField,
  ApplicationFieldResponse
} = require("../../config/mock-db");

describe("ApplicationFieldResponse Model", () => {
  it("creates a uuid on save", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id: userId } = await User.findOne();
    const { id: applicationId } = await Application.create({
      status: "APPLIED",
      eventId,
      userId
    });
    const { id: fieldId } = await ApplicationField.create({
      eventId,
      type: "TEXT_INPUT",
      label: "What's the biggest event of 2018"
    });
    const { id } = await ApplicationFieldResponse.create({
      answer: "qhacks ;)",
      fieldId,
      applicationId
    });

    expect(id).toBeDefined();
  });
});
