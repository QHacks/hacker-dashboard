const mongoose = require("mongoose");
const mailingListSchmea = require("./schema/mailingList.schema");

module.exports = mongoose.model("MailingList", mailingListSchmea);
