const { db } = global;

describe("EventSponsor Model", () => {
  it("prevents duplicate records", async () => {
    const { id: sponsorId } = await db.Sponsor.create({
      name: "Pied Piper",
      sponsorshipLevel: "TERA",
      contactEmail: "richard@piedpiper.com",
      contactAddress: "123 Fake Street"
    });
    const { id: eventId } = await db.Event.findOne({});

    try {
      await db.EventSponsor.bulkCreate([
        { eventId, sponsorId },
        { eventId, sponsorId }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("eventId must be unique");
    }
  });
});
