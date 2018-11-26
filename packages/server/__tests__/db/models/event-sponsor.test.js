const { Event, EventSponsor, Sponsor } = require("../../config/mock-db");

describe("EventSponsor Model", () => {
  it("prevents duplicates", async (done) => {
    const { id: sponsorId } = await Sponsor.create({
      name: "Pied Piper",
      sponsorshipLevel: "TERA",
      contactEmail: "richard@piedpiper.com",
      contactAddress: "123 Fake Street"
    });
    const { id: eventId } = await Event.findOne({});
    EventSponsor.bulkCreate([
      { eventId, sponsorId },
      { eventId, sponsorId }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("eventId must be unique");
      done();
    });
  });
});
