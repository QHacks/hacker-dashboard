const { Settings } = require("../../models");

describe("Settings model", () => {
  it("Retrieves all settings", async () => {
    const settings = await Settings.find({});
    expect(settings.length).toBe(1);
    expect(settings[0]).toEqual(
      expect.objectContaining({ numberOfReviewsRequired: 10 })
    );
  });

  it("Saves new settings", async () => {
    const settingObj = { numberOfReviewsRequired: 100 };
    const setting = new Settings(settingObj);

    const savedSetting = await setting.save();
    const settingEntry = await Settings.findById(savedSetting._id);

    expect(settingEntry).toEqual(expect.objectContaining(settingObj));
  });
});
