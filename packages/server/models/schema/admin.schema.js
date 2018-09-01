const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  reviewGroup: {
    type: Number,
    min: [0, "Group number must be a valid array index, i.e. non-negative."]
  },
  goldenTickets: Number
});

module.exports = AdminSchema;
