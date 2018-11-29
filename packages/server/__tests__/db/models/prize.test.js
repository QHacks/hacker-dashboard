const { Event, Sponsor, Prize } = require("../../config/mock-db");

describe("Prize Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id: sponsorId } = await Sponsor.create({
      name: "Pied Piper",
      sponsorshipLevel: "TERA",
      contactEmail: "richard@piedpiper.com",
      contactAddress: "123 Fake Street"
    });
    const { id } = await Prize.create({
      eventId,
      sponsorId,
      title: "Amazon Prime Gift Card",
      description: "An Amazon Prime Gift Card to spend on your choosing"
    });

    expect(id).toBeDefined();
  });
});
