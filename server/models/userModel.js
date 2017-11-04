const mongoose = require('mongoose');


const SIGN_UP_FIELDS = [
	'dateOfBirth',
	'email',
	'firstName',
	'graduationYear',
	'lastName',
	'phoneNumber',
	'password'
];


const GROUPS = {
	ADMIN: 'admin',
	PARTNER: 'partner',
	HACKER: 'hacker'
};

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
		group: {
			type: String,
			default: GROUPS.HACKER,
			enum: Object.keys(GROUPS).map(k => GROUPS[k])
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
		}
});

module.exports = mongoose.model('User', UserSchema);
