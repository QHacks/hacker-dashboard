const {
  ActivityCheckIn,
  Activity,
  Location,
  Event,
  User
} = require("../../config/mock-db");

describe("ActivityCheckIn Model", () => {
  beforeEach(async () => {
    const { id: eventId } = await Event.findOne({});
    const { id: locationId } = await Location.create({
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

    return await Activity.create({
      eventId,
      locationId,
      name: "HOW TO WRITE TESTS",
      description: "TDD <3",
      startDate: new Date(),
      endDate: new Date()
    });
  });

  it("prevents duplicates", async (done) => {
    const { id: activityId } = await Activity.findOne({});
    const { id: userId } = await User.findOne({});
    ActivityCheckIn.bulkCreate([
      { activityId, userId },
      { activityId, userId }
    ]).catch(({ errors: [{ message }] }) => {
      expect(message).toBe("activityId must be unique");
      done();
    });
  });
});
