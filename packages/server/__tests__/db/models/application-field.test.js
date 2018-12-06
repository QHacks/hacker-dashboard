const { ApplicationField, Event } = require("../../config/mock-db");

describe("ApplicationField Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await Event.findOne({});
    const { id } = await ApplicationField.create({
      label: "check this box if you're cool",
      shortLabel: "coolBox",
      type: "CHECKBOX",
      eventId
    });
    expect(id).toBeDefined();
  });
});
