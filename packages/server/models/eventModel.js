const mongoose = require('mongoose');
const uuid = require('uuid');

const EventSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Event', EventSchema);
