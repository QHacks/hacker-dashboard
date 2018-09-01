const mongoose = require("mongoose");
const { EventSchema } = require("./schema");

module.exports = mongoose.model("Event", EventSchema);
