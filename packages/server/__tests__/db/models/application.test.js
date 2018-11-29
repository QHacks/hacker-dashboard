const { Application, User, Event } = require("../../config/mock-db");

describe("Application model", () => {
  it("saves with a uuid", async () => {
    const { id: userId } = await User.findOne({});
    const { id: eventId } = await Event.findOne({});
    const { id } = await Application.create({
      status: "APPLIED",
      eventId,
      userId
    });

    expect(id).toBeDefined();
  });
});
