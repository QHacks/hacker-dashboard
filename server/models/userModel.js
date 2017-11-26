const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mlhSchools = require('../strings/mlhSchools.json');

const SALT_WORK_FACTOR = 10;

const DEGREE_TYPES = [
	'Bachelor\'s degree',
	'Master\'s degree',
	'Ph.D.',
	'High School',
	'Other'
];

const GENDERS = [
	'Female',
	'Male',
	'Other',
	'Prefer not to say'
];

const GRADUATION_YEARS = [
	'2022',
	'2021',
	'2020',
	'2019',
	'2018',
	'Other'
];

const MONTHS_IN_A_YEAR = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const NUMBER_OF_HACKATHONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

const UserSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuid.v4
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: Date,
		required: true
	},
	gender: {
		type: String,
		enum: GENDERS,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	school: {
		type: String,
		required: true,
		enum: mlhSchools
	},
	degreeType: {
		type: String,
		required: true,
		enum: DEGREE_TYPES
	},
	program: {
		type: String,
		required: true
	},
	graduationYear: {
		type: String,
		required: true
	},
	graduationMonth: {
		type: String,
		enum: MONTHS_IN_A_YEAR,
		required: true
	},
	travelOrigin: {
		type: String,
		required: true
	},
	numberOfHackathons: {
		type: String,
		required: true,
		enum: NUMBER_OF_HACKATHONS
	},
	whyQhacks: {
		type: String,
		required: true
	},
	links: {
		type: String,
		required: true
	},
	events: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	}],
	applicationStatus: {
		type: String,
		enum: ['APPLIED', 'REJECTED', 'WAITING_LIST', 'ACCEPTED'],
		default: 'APPLIED'
	},
	rsvpStatus: {
		type: String,
		enum: ['NOT_NEEDED', 'PENDING', 'DECLINED', 'ACCEPTED'],
		default: 'NOT_NEEDED'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	modifiedAt: {
		type: Date,
		default: Date.now
	},
	passwordResetHash: {
		type: String
	},
	refreshToken: {
		type: String
	}
});

UserSchema.static({
	authenticate(email, password) {
		return new Promise((resolve, reject) => {
			this.findOne({ email })
				.then((user) => {
					if (!user) return reject('No user with that email!');

					user.validPassword(password)
						.then(() => {
							resolve(user);
						})
						.catch(() => {
							reject('Invalid password!');
						});
				});
		});
	}
});

UserSchema.method({
	validPassword(password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, this.password, (err, valid) => {
				if (err || !valid) return reject();
				return resolve();
			});
		});
	}
});

/**
 * Helper method to hash password before saving.
 * @param {Function} next Move to next middleware.
 * @return {Function} Next middleware.
 */
UserSchema.pre('save', function(next) {
	if (!this.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
			if (err) return next(err);

		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) next(err);

			this.password = hash;
			this.modifiedAt = Date.now();
			next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema);
