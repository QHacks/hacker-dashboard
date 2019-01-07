const { db } = global;

describe("ApplicationField Model", () => {
  it("saves with a uuid", async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id } = await db.ApplicationField.create({
      label: "check this box if you're cool",
      shortLabel: "coolBox",
      type: "CHECKBOX",
      eventId
    });

    expect(id).toBeDefined();
  });
});
