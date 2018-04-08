const mongoose = require('mongoose');
const uuid = require('uuid');

const SettingsSchema = mongoose.Schema({
	_id: {
		type: String,
		default: uuid.v4
	},
	numberOfReviewsRequired: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Settings', SettingsSchema);
