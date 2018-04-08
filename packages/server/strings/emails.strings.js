module.exports = {
	EMAIL_ADDRESSES: {
		QHACKS_HELLO: 'hello@qhacks.io',
		QHACKS_NO_REPLY: 'no-reply@qhacks.io'
	},
	TEMPLATES: {
		APPLICATION_ACCEPTED: {
			NAME: 'application-accepted',
			SUBJECT: 'Congrats, you\'re coming to QHacks 2018!',
			TEXT: 'You\'ve been accepted to QHacks 2018! See https://app.qhacks.io for more details.'
		},
		APPLICATION_ACCEPTED_FROM_WAITLIST: {
			NAME: 'application-accepted-from-waitlist',
			SUBJECT: 'Congrats, you\'re coming to QHacks 2018!',
			TEXT: 'You\'ve been accepted to QHacks 2018! See https://app.qhacks.io for more details.'
		},
		APPLICATION_ACCEPTED_REMINDER: {
			NAME: 'application-accepted-reminder',
			SUBJECT: 'Less than two weeks to QHacks 2018!',
			TEXT: 'You\'ve been accepted to QHacks 2018. Make sure to go to https://app.qhacks.io to fill out your RSVP.'
		},
		APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED: {
			NAME: 'application-accepted-reminder-after-waitlist-accepted',
			SUBJECT: 'One week until QHacks 2018!',
			TEXT: 'You\'ve been accepted to QHacks 2018. Make sure to go to https://app.qhacks.io to fill out your RSVP.'
		},
		APPLICATION_DECLINED: {
			NAME: 'application-declined',
			SUBJECT: 'QHacks 2018 Application Status',
			TEXT: 'Due to a very competitive applicant pool, we are unfortunately unable to offer you a spot at QHack 2018. Keep hacking!'
		},
		APPLICATION_SUCCESSFUL: {
			NAME: 'application-successful',
			SUBJECT: 'QHacks 2018 - Hacker Application Received!',
			TEXT: 'Thank you for applying to QHacks 2018! See https://qhacks.io for more details.'
		},
		APPLICATION_WAITLISTED: {
			NAME: 'application-waitlisted',
			SUBJECT: 'QHacks 2018 Application Status',
			TEXT: 'We\'ve put you on the waitlist for QHacks 2018. Don\'t worry though! More acceptances will be going out on a rolling basis in the next few days, so keep checking your email.'
		},
		RESET_PASSWORD: {
			NAME: 'reset-password',
			SUBJECT: 'QHacks Password Reset Email'
		},
		RESET_PASSWORD_SUCCESS: {
			NAME: 'reset-password-success',
			SUBJECT: 'QHacks Password Reset Successful',
			TEXT: 'Your password has been updated!'
		}
	}
};
