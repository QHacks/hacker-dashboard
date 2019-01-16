const { db } = global;

describe("Event Model", () => {
  it("saves with a uuid", async () => {
    const { id } = await db.Event.create({
      name: "Joey's cool event",
      slug: "joeys-cool-slug",
      startDate: new Date(),
      endDate: new Date()
    });

    expect(id).toBeDefined();
  });

  it("validates event logo url", async () => {
    try {
      await db.Event.create({
        name: "Joey's cool event",
        slug: "joeys-cool-slug",
        startDate: new Date(),
        endDate: new Date(),
        eventLogoUrl: "ayyy lmao"
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("Validation isUrl on eventLogoUrl failed");
    }
  });

  it("has a unique index on slug", async () => {
    try {
      await db.Event.create({
        name: "Joey's sneaky event >:-)",
        slug: "qhacks-2019",
        startDate: new Date(),
        endDate: new Date()
      });
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("slug must be unique");
    }
  });
});
