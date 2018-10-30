const mongoose = require("mongoose");
const subscriptionSchema = require("./schema/subscription.schema");

module.exports = mongoose.model("Subscription", subscriptionSchema);
