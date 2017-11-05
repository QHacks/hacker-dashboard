const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = new mongoose.Schema({
		_id: {
			type: String,
			default: uuid.v4
		},
		email: {
				type: String,
				required: true,
				unique: true,
				index: true
		},
		firstName: {
				type: String,
				required: true
		},
		lastName: {
				type: String,
				required: true
		},
		dateOfBirth: {
				type: Date,
				required: true
		},
		graduationYear: {
				type: String,
				required: true
		},
		phoneNumber: {
				type: String,
				required: true
		},
		password: {
				type: String,
				required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		modifiedAt: {
			type: Date,
			default: Date.now
		},
		refreshToken: String
});

module.exports = UserSchema;
