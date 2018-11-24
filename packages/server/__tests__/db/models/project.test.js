const { Project, Event } = require("../../config/mock-db");

describe("Project Model", () => {
  it("creates a uuid on save", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id } = await Project.create({
      eventId,
      name: "Lorem Ipsum",
      description: "lorem ipsum"
    });

    expect(id).toBeDefined();
  });
});
