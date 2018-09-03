const { Event } = require("../../models");

describe("Events model", () => {
  it("Retrieves all models", async () => {
    const events = await Event.find({});
    expect(events.length).toBe(1);
    expect(events[0]).toEqual(
      expect.objectContaining({ name: "testEvent", slug: "Test Event" })
    );
  });

  it("Saves new models correctly", async () => {
    const eventObj = {
      name: "newEvent",
      slug: "New Event"
    };
    const newEvent = new Event(eventObj);
    const savedEvent = await newEvent.save();
    const newEntry = await Event.findById(savedEvent._id);
    expect(newEntry).toEqual(expect.objectContaining(eventObj));
  });
});
