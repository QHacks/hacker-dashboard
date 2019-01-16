const { db } = global;

describe("Sponsor Model", () => {
  it("saves with a uuid", async () => {
    const { id } = await db.Sponsor.create({
      name: "Pied Piper",
      sponsorshipLevel: "TERA",
      contactEmail: "richard@piedpiper.com",
      contactAddress: "123 Fake Street"
    });

    expect(id).toBeDefined();
  });
});
