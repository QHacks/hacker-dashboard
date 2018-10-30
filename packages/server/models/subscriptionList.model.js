const mongoose = require("mongoose");
const subscriptionListSchema = require("./schema/subscriptionList.schema");

module.exports = mongoose.model("SubscriptionList", subscriptionListSchema);
