const { Event } = require("../../config/mock-db");

describe("Event model", () => {
  it("saves with a uuid", async () => {
    const { id } = await Event.create({
      name: "Joey's cool event",
      slug: "joeys-cool-slug",
      startDate: new Date(),
      endDate: new Date()
    });

    expect(id).toBeDefined();
  });

  it("validates event logo url", (done) => {
    Event.create({
      name: "Joey's cool event",
      slug: "joeys-cool-slug",
      startDate: new Date(),
      endDate: new Date(),
      eventLogoUrl: "ayyy lmao"
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("Validation isUrl on eventLogoUrl failed");
      done();
    });
  });

  it("has a unique index on slug", (done) => {
    Event.create({
      name: "Joey's sneaky event >:-)",
      slug: "qhacks-2019",
      startDate: new Date(),
      endDate: new Date()
    }).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("slug must be unique");
      done();
    });
  });
});
