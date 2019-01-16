const { db } = global;

describe("ActivityCheckIn Model", () => {
  beforeEach(async () => {
    const { id: eventId } = await db.Event.findOne({});
    const { id: locationId } = await db.Location.create({
      name: "Mitchell Hall",
      addressLine1: "69 Union St",
      addressCity: "Kingston",
      addressCountry: "Canada",
      addressCountryCode: "CA",
      addressProvince: "Ontario",
      addressProvinceCode: "ON",
      addressZIP: "K7L 2N9",
      addressLatitude: 44.227819,
      addressLongitude: -76.493939
    });

    await db.Activity.create({
      eventId,
      locationId,
      name: "HOW TO WRITE TESTS",
      description: "TDD <3",
      startDate: new Date(),
      endDate: new Date()
    });
  });

  it("prevents duplicate records", async () => {
    const { id: activityId } = await db.Activity.findOne({});
    const { id: userId } = await db.User.findOne({});

    try {
      await db.ActivityCheckIn.bulkCreate([
        { activityId, userId },
        { activityId, userId }
      ]);
    } catch ({ errors: [{ message }] }) {
      expect(message).toBe("userId must be unique");
    }
  });
});
