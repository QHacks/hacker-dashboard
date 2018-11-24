const { Sponsor } = require("../../config/mock-db");

describe("Sponsor Model", () => {
  it("saves with a uuid", async () => {
    const { id } = await Sponsor.create({
      name: "Pied Piper",
      sponsorshipLevel: "TERA",
      contactEmail: "richard@piedpiper.com",
      contactAddress: "123 Fake Street"
    });

    expect(id).toBeDefined();
  });
});
