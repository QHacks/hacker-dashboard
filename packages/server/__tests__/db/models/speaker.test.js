const { Speaker, Event } = require("../../config/mock-db");

describe("Speaker Model", () => {
  it("saves witha uuid", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id } = await Speaker.create({
      firstName: "Lee",
      lastName: "Byron",
      bio: "A cool guy B-)",
      companyName: "GraphQL",
      companyPosition: "Creator",
      eventId
    });

    expect(id).toBeDefined();
  });
});
