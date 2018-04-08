import queryString from 'querystring';

// Request Methods
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';

// API Endpoint Constants
const API_SUFFIX = '/api/v1';
const USERS_ENDPOINT = '/users';
const LOGIN_ENDPOINT = '/auth/session';
const SIGNUP_ENDPOINT = '/auth/signup';
const REFRESH_ENDPOINT = '/auth/refresh';
const VALIDATE_ENDPOINT = '/auth/refresh';
const RESET_HASH_ENDPOINT = '/auth/createResetHash';
const UPDATE_PASSWORD_FOR_RESET_ENDPOINT = '/auth/updatePasswordForReset';
const APPLICATION_TO_REVIEW_ENDPOINT = '/admin/applications/review';
const APPLICATIONS_WITH_REVIEWS_ENDPOINT = '/admin/applications/reviewed';
const APPLICATIONS_WITH_REVIEWS_COUNT_ENDPOINT = '/admin/applications/reviewed/count';
const REVIEWERS_ENDPOINT = '/admin/applications/reviewers';
const SETTINGS_ENDPOINT = '/admin/settings';
const EMAIL_ENDPOINT = '/admin/email';
const EMAILS_ENDPOINT = '/admin/emails';
const ADMINS_ENDPOINT = '/admins';
const APPLICATIONS_ENDPOINT = '/admin/applications';

/**
 * Specific middleware action types.
 * NOTE: These are crucial to how sagas operate.
 * @type {Object}
 */
const hackerMiddlwareActionTypes = {
	INVOKE_API_CALL: '@@/hackerMiddleware/INVOKE_API_CALL',
	INVOKE_API_FAIL: '@@/hackerMiddleware/INVOKE_API_FAIL'
};

/**
 * API Middleware request action types.
 * NOTE: This action type will be dispatched from middleware
 * upon validation from middleware, use to update status flags in reducer.
 * @type {Object}
 */
const apiRequestTypes = {
	LOGIN_REQUEST: '@@/hacker/LOGIN_REQUEST',
	SIGNUP_REQUEST: '@@/hacker/SIGNUP_REQUEST',
	REFRESH_TOKENS: '@@/hacker/REFRESH_TOKENS',
	VALIDATE_TOKENS: '@@/hacker/VALIDATE_TOKENS',

	RSVP_REQUEST: '@@/hacker/RSVP_REQUEST',
	WITHDRAW_APPLICATION: '@@/hacker/WITHDRAW_APPLICATION',

	CREATE_RESET_HASH: '@@/hacker/CREATE_RESET_HASH',
	UPDATE_PASSWORD_RESET: '@@/hacker/UPDATE_PASSWORD_RESET',

	GET_USERS: '@@/hacker/GET_USERS',
	FETCH_ADMINS: '@@/hacker/FETCH_ADMINS',
	FETCH_APPLICATION_TO_REVIEW: '@@/hacker/FETCH_APPLICATION_TO_REVIEW',
	FETCH_SETTINGS: '@@/hacker/FETCH_SETTINGS',
	FETCH_REVIEWERS: '@@/hacker/FETCH_REVIEWERS',
	FETCH_APPLICATIONS_WITH_REVIEWS: '@@/hacker/FETCH_APPLICATIONS_WITH_REVIEWS',
	FETCH_APPLICATIONS_WITH_REVIEWS_COUNT: '@@/hacker/FETCH_APPLICATIONS_WITH_REVIEWS_COUNT',
	FETCH_EMAILS: '@@/hacker/FETCH_EMAILS',
	FETCH_HACKERS_REQUIRING_CHECK_IN: '@@/hacker/FETCH_HACKERS_REQUIRING_CHECK_IN',
	REASSIGN_REVIEWERS: '@@/hacker/REASSIGN_REVIEWERS',

	SUBMIT_APPLICATION_REVIEW: '@@/hacker/SUBMIT_APPLICATION_REVIEW',
	SEND_EMAIL: '@@/hacker/SEND_EMAIL',
	UPDATE_APPLICATION_STATUS: '@@/hacker/UPDATE_APPLICATION_STATUS',
	UPDATE_HACKER_CHECK_IN_STATUS: '@@/hacker/UPDATE_HACKER_CHECK_IN_STATUS'
};

/**
 * API Middleware success action types.
 * NOTE: This action type will be dispatched from middleware
 * if the request is successful (2.x.x status), will hold data from response.
 * @type {Object}
 */
const apiSuccessTypes = {
	AUTHENTICATED: '@@/hacker/AUTHENTICATED',
	TOKENS_REFRESHED: '@@/hacker/TOKENS_REFRESHED',

	CREATE_RESET_HASH_SUCCESS: '@@/hacker/CREATE_RESET_HASH_SUCCESS',
	UPDATE_PASSWORD_RESET_SUCCESS: '@@/hacker/UPDATE_PASSWORD_RESET_SUCCESS',

	RSVP_SUCCESS: '@@/hacker/RSVP_SUCCESS',
	WITHDRAW_SUCCESS: '@@/hacker/WITHDRAW_SUCCESS',


	USERS_FETCHED: '@@/hacker/USERS_FETCHED',
	ADMINS_FETCHED: '@@/hacker/ADMINS_FETCHED',
	APPLICATION_TO_REVIEW_FETCHED: '@@/hacker/APPLICATION_TO_REVIEW_FETCHED',
	SETTINGS_FETCHED: '@@/hacker/SETTINGS_FETCHED',
	REVIEWERS_FETCHED: '@@/hacker/REVIEWERS_FETCHED',
	APPLICATIONS_WITH_REVIEWS_FETCHED: '@@/hacker/APPLICATIONS_WITH_REVIEWS_FETCHED',
	APPLICATIONS_WITH_REVIEWS_COUNT_FETCHED: '@@/hacker/APPLICATIONS_WITH_REVIEWS_COUNT_FETCHED',
	EMAILS_FETCHED: '@@/hacker/EMAILS_FETCHED',
	HACKERS_REQUIRING_CHECK_IN_FETCHED: '@@/hacker/HACKERS_REQUIRING_CHECK_IN_FETCHED',
	REVIEWERS_REASSIGNED: '@@/hacker/REVIEWERS_REASSIGNED',

	APPLICATION_REVIEW_SUBMITTED: '@@/hacker/APPLICATION_REVIEW_SUBMITTED',
	EMAIL_SENT: '@@/hacker/EMAIL_SENT',
	APPLICATION_STATUS_UPDATED: '@@/hacker/APPLICATION_STATUS_UPDATED',
	HACKER_CHECK_IN_STATUS_UPDATED: '@@/hacker/HACKER_CHECK_IN_STATUS_UPDATED'
};

/**
 * API Middleware failure action types.
 * NOTE: This action type will be dispatch from middleware
 * if the request fails (anything other than 2.x.x status).
 * @type {Object}
 */
const apiErrorTypes = {
	AUTHENTICATION_ERROR: '@@/hacker/AUTHENTICATION_ERROR',
	APPLICATION_ERROR: '@@/hacker/APPLICATION_ERROR',
	TOKENS_CANNOT_REFRESH: '@@/hacker/TOKENS_CANNOT_REFRESH',

	RSVP_ERROR: '@@/hacker/RSVP_ERROR',
	WITHDRAW_FAIL: '@@/hacker/WITHDRAW_FAIL',

	CREATE_RESET_HASH_FAIL: '@@/hacker/CREATE_RESET_HASH_FAIL',
	UPDATE_PASSWORD_RESET_FAIL: '@@/hacker/UPDATE_PASSWORD_RESET_FAIL',

	USER_FETCH_ERROR: '@@/hacker/USER_FETCH_ERROR',
	ADMINS_FETCH_ERROR: '@@/hacker/USER_FETCH_ERROR',
	APPLICATION_TO_REVIEW_FETCH_ERROR: '@@/hacker/APPLICATION_TO_REVIEW_FETCH_ERROR',
	SETTINGS_FETCH_ERROR: '@@/hacker/SETTINGS_FETCH_ERROR',
	REVIEWERS_FETCH_ERROR: '@@/hacker/REVIEWERS_FETCH_ERROR',
	APPLICATIONS_WITH_REVIEWS_FETCH_ERROR: '@@/hacker/APPLICATIONS_WITH_REVIEWS_FETCH_ERROR',
	APPLICATIONS_WITH_REVIEWS_COUNT_FETCH_ERROR: '@@/hacker/APPLICATIONS_WITH_REVIEWS_COUNT_FETCH_ERROR',
	EMAILS_FETCH_ERROR: '@@/hacker/EMAILS_FETCH_ERROR',
	HACKERS_REQUIRING_CHECK_IN_FETCH_ERROR: '@@/hacker/HACKERS_REQUIRING_CHECK_IN_FETCH_ERROR',
	REVIEWERS_REASSIGN_ERROR: '@@/hacker/REVIEWERS_REASSIGN_ERROR',

	APPLICATION_REVIEW_SUBMIT_ERROR: '@@/hacker/APPLICATION_REVIEW_SUBMIT_ERROR',
	EMAIL_SEND_ERROR: '@@/hacker/EMAIL_SEND_ERROR',
	APPLICATION_STATUS_UPDATE_ERROR: '@@/hacker/APPLICATION_STATUS_UPDATE_ERROR',
	HACKER_CHECK_IN_STATUS_UPDATE_ERROR: '@@/hacker/HACKER_CHECK_IN_STATUS_UPDATE_ERROR'
};

/**
 * Normal action types that won't be handled by middleware.
 * @type {Object}
 */
const normalTypes = {
	LOGOUT: '@@/hacker/LOGOUT',
	BOOTSTRAP_COMPLETE: '@@/hacker/BOOTSTRAP_COMPLETE',
	CLEAR_RESET_PASSWORD: '@@/hacker/CLEAR_RESET_PASSWORD',
	APPLICATION_PAGE_UPDATE: '@@/hacker/APPLICATION_PAGE_UPDATE',
	APPLICATION_FORM_ERROR_MESSAGES_UPDATE: '@@/hacker/APPLICATION_FORM_ERROR_MESSAGES_UPDATE',
	CLEAR_DASHBOARD_SUCCESS_MESSAGE: '@@/hacker/CLEAR_DASHBOARD_SUCCESS_MESSAGE',
	CLEAR_DASHBOARD_ERROR_MESSAGE: '@@/hacker/CLEAR_DASHBOARD_ERROR_MESSAGE',
	SET_TEST_EMAIL_RECIPIENTS: '@@/hacker/SET_TEST_EMAIL_RECIPIENTS',
	SET_REVIEW_TABLE_PAGE: '@@/hacker/SET_REVIEW_TABLE_PAGE',
	SET_HACKER_ID_TO_CHECK_IN: '@@/hacker/SET_HACKER_ID_TO_CHECK_IN'
};

export const actionTypes = {
	...hackerMiddlwareActionTypes,
	...apiRequestTypes,
	...apiSuccessTypes,
	...apiErrorTypes,
	...normalTypes
};

/**
 * Any normal action creators, utilize normal action types.
 * NOTE: Empty for now but this is where they should be.
 * @type {Object}
 */
const normalActionCreators = {
	logout: () => ({ type: actionTypes.LOGOUT }),
	bootstrapComplete: (data) => ({ type: actionTypes.BOOTSTRAP_COMPLETE, data }),
	clearResetPassword: () => ({ type: actionTypes.CLEAR_RESET_PASSWORD }),
	applicationPageUpdate: (data) => ({ type: actionTypes.APPLICATION_PAGE_UPDATE, data }),
	applicationFormErrorMessagesUpdate: (data) => ({ type: actionTypes.APPLICATION_FORM_ERROR_MESSAGES_UPDATE, data }),
	applicationError: (data) => ({ type: actionTypes.APPLICATION_ERROR, data }),
	clearDashboardSuccessMessage: (data) => ({ type: actionTypes.CLEAR_DASHBOARD_SUCCESS_MESSAGE, data }),
	clearDashboardErrorMessage: (data) => ({ type: actionTypes.CLEAR_DASHBOARD_ERROR_MESSAGE, data }),
	setTestEmailRecipients: (data) => ({ type: actionTypes.SET_TEST_EMAIL_RECIPIENTS, data }),
	setReviewTablePage: (data) => ({ type: actionTypes.SET_REVIEW_TABLE_PAGE, data }),
	setHackerIDToCheckIn: (data) => ({ type: actionTypes.SET_HACKER_ID_TO_CHECK_IN, data })
};

/**
 * Action creators that trigger API middleware.
 * NOTE: Action objects must have a INVOKE_API key.
 * @type {Object}
 */
const invokeAPIActionCreators = {
	login: (credentials) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.LOGIN_REQUEST, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
			request: {
				url: `${API_SUFFIX}${LOGIN_ENDPOINT}`,
				method: POST,
				body: credentials
			}
		}
	}),

	apply: (signUpInfo) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.SIGNUP_REQUEST, actionTypes.AUTHENTICATED, actionTypes.APPLICATION_ERROR],
			request: {
				url: `${API_SUFFIX}${SIGNUP_ENDPOINT}`,
				method: POST,
				body: signUpInfo
			}
		}
	}),

	validateToken: (refreshTokenToValidate) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.VALIDATE_TOKENS, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
			request: {
				url: `${API_SUFFIX}${VALIDATE_ENDPOINT}`,
				method: POST,
				body: { refreshToken: refreshTokenToValidate }
			}
		}
	}),

	refresh: (refreshToken) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.REFRESH_TOKENS, actionTypes.TOKENS_REFRESHED, actionTypes.INVOKE_API_FAIL],
			request: {
				url: `${API_SUFFIX}${REFRESH_ENDPOINT}`,
				method: POST,
				body: { refreshToken }
			}
		}
	}),

	createResetHash: (email) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.CREATE_RESET_HASH, actionTypes.CREATE_RESET_HASH_SUCCESS, actionTypes.CREATE_RESET_HASH_FAIL],
			request: {
				url: `${API_SUFFIX}${RESET_HASH_ENDPOINT}`,
				method: POST,
				body: email
			}
	}
	}),

	updatePasswordForReset: (resetHash, newPassword) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.UPDATE_PASSWORD_RESET, actionTypes.UPDATE_PASSWORD_RESET_SUCCESS, actionTypes.UPDATE_PASSWORD_RESET_FAIL],
			request: {
				url: `${API_SUFFIX}${UPDATE_PASSWORD_FOR_RESET_ENDPOINT}`,
				method: POST,
				body: { resetHash, password: newPassword }
			}
		}
	}),

	getUsers: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.GET_USERS, actionTypes.USERS_FETCHED, actionTypes.USER_FETCH_ERROR],
			request: {
				url: `${API_SUFFIX}${USERS_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	fetchApplicationToReview: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_APPLICATION_TO_REVIEW,
				actionTypes.APPLICATION_TO_REVIEW_FETCHED,
				actionTypes.APPLICATION_TO_REVIEW_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}${APPLICATION_TO_REVIEW_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	fetchSettings: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.FETCH_SETTINGS, actionTypes.SETTINGS_FETCHED, actionTypes.SETTINGS_FETCH_ERROR],
			request: {
				url: `${API_SUFFIX}${SETTINGS_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	fetchReviewers: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_REVIEWERS,
				actionTypes.REVIEWERS_FETCHED,
				actionTypes.REVIEWERS_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}${REVIEWERS_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	reassignReviewers: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.REASSIGN_REVIEWERS,
				actionTypes.REVIEWERS_REASSIGNED,
				actionTypes.REVIEWERS_REASSIGN_ERROR
			],
			request: {
				url: `${API_SUFFIX}${REVIEWERS_ENDPOINT}`,
				method: PUT,
				tokenRequired: true
			}
		}
	}),

	submitApplicationReview: (userId, review) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.SUBMIT_APPLICATION_REVIEW,
				actionTypes.APPLICATION_REVIEW_SUBMITTED,
				actionTypes.APPLICATION_REVIEW_SUBMIT_ERROR
			],
			request: {
				url: `${API_SUFFIX}${APPLICATION_TO_REVIEW_ENDPOINT}/${userId}`,
				method: POST,
				tokenRequired: true,
				body: { review }
			}
		}
	}),

	fetchApplicationsWithReviews: (options) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_APPLICATIONS_WITH_REVIEWS,
				actionTypes.APPLICATIONS_WITH_REVIEWS_FETCHED,
				actionTypes.APPLICATIONS_WITH_REVIEWS_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}${APPLICATIONS_WITH_REVIEWS_ENDPOINT}?${queryString.stringify(options)}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	fetchApplicationsWithReviewsCount: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_APPLICATIONS_WITH_REVIEWS_COUNT,
				actionTypes.APPLICATIONS_WITH_REVIEWS_COUNT_FETCHED,
				actionTypes.APPLICATIONS_WITH_REVIEWS_COUNT_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}${APPLICATIONS_WITH_REVIEWS_COUNT_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	fetchEmails: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_EMAILS,
				actionTypes.EMAILS_FETCHED,
				actionTypes.EMAILS_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}${EMAILS_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
	}
	}),

	fetchAdmins: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_ADMINS,
				actionTypes.ADMINS_FETCHED,
				actionTypes.ADMINS_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}${ADMINS_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	sendEmail: (templateName, recipients) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.SEND_EMAIL, actionTypes.EMAIL_SENT, actionTypes.EMAIL_SEND_ERROR],
			request: {
				url: `${API_SUFFIX}${EMAIL_ENDPOINT}`,
				method: POST,
				tokenRequired: true,
				body: {
					recipients,
					templateName
				}
			}
		}
	}),

	updateApplicationStatus: (userId, eventId, status) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.UPDATE_APPLICATION_STATUS,
				actionTypes.APPLICATION_STATUS_UPDATED,
				actionTypes.APPLICATION_STATUS_UPDATE_ERROR
			],
			request: {
				url: `${API_SUFFIX}${APPLICATIONS_ENDPOINT}/${eventId}/${userId}`,
				method: PUT,
				tokenRequired: true,
				body: { status }
			}
		}
	}),

	submitRSVP: (userId, eventId, rsvp) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.RSVP_REQUEST,
				actionTypes.RSVP_SUCCESS,
				actionTypes.RSVP_ERROR
			],
			request: {
				url: `${API_SUFFIX}/users/${userId}/applications/${eventId}/rsvp`,
				method: PUT,
				tokenRequired: true,
				body: { rsvp }
			}
		}
	}),

	withdrawApplication: (userId, eventId) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.WITHDRAW_APPLICATION,
				actionTypes.WITHDRAW_SUCCESS,
				actionTypes.WITHDRAW_FAIL
			],
			request: {
				url: `${API_SUFFIX}/users/${userId}/applications/${eventId}`,
				method: PUT,
				tokenRequired: true,
				body: {
					status: 'WITHDRAWN'
				}
			}
		}
	}),

	fetchHackersRequiringCheckIn: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.FETCH_HACKERS_REQUIRING_CHECK_IN,
				actionTypes.HACKERS_REQUIRING_CHECK_IN_FETCHED,
				actionTypes.HACKERS_REQUIRING_CHECK_IN_FETCH_ERROR
			],
			request: {
				url: `${API_SUFFIX}/admin/applications/check-in`,
				method: GET,
				tokenRequired: true
			}
		}
	}),

	updateHackerCheckInStatus: (userId, eventId, status) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [
				actionTypes.UPDATE_HACKER_CHECK_IN_STATUS,
				actionTypes.HACKER_CHECK_IN_STATUS_UPDATED,
				actionTypes.HACKER_CHECK_IN_STATUS_UPDATE_ERROR
			],
			request: {
				url: `${API_SUFFIX}/admin/applications/${eventId}/${userId}/check-in`,
				method: PUT,
				tokenRequired: true,
				body: {
					status
				}
			}
		}
	})
};

export const actionCreators = {
	...normalActionCreators,
	...invokeAPIActionCreators
};
