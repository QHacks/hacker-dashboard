const mongoose = require("mongoose");
const { SettingsSchema } = require("./schema");

module.exports = mongoose.model("Settings", SettingsSchema);
