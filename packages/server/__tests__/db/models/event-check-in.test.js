const { EventCheckIn, Event, User } = require("../../config/mock-db");

describe("EventCheckIn Model", () => {
  it("prevents duplicates", async (done) => {
    const { id: eventId } = await Event.findOne({});
    const { id: userId } = await User.findOne({});

    EventCheckIn.bulkCreate([
      {
        eventId,
        userId
      },
      {
        eventId,
        userId
      }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("userId must be unique");
      done();
    });
  });
});
