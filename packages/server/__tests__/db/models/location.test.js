const { Location } = require("../../config/mock-db");

describe("Location Model", () => {
  it("saves with a uuid", async () => {
    const { id } = await Location.create({
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

    expect(id).toBeDefined();
  });
});
