// Request Methods
const POST = 'POST';
const GET = 'GET';

// API Endpoint Constants
const API_SUFFIX = '/api/v1';
const USERS_ENDPOINT = '/users';
const LOGIN_ENDPOINT = '/auth/session';
const SIGNUP_ENDPOINT = '/auth/signup';
const REFRESH_ENDPOINT = '/auth/refresh';
const VALIDATE_ENDPOINT = '/auth/refresh';
const RESET_HASH_ENDPOINT = '/auth/createResetHash';
const UPDATE_PASSWORD_ENDPOINT = '/auth/updatePassword';

/**
 * Specific middleware action types.
 * NOTE: These are crucial to how sagas operate.
 * @type {Object}
 */
const hackerMiddlwareActionTypes = {
	"INVOKE_API_CALL": "@@/hackerMiddleware/INVOKE_API_CALL",
	"INVOKE_API_FAIL": "@@/hackerMiddleware/INVOKE_API_FAIL"
};

/**
 * API Middleware request action types.
 * NOTE: This action type will be dispatched from middlware
 * upon validation from middlware, use to update status flags in reducer.
 * @type {Object}
 */
const apiRequestTypes = {
	"LOGIN_REQUEST": "@@/hacker/LOGIN_REQUEST",
	"SIGNUP_REQUEST": "@@/hacker/SIGNUP_REQUEST",
	"REFRESH_TOKENS": "@@/hacker/REFRESH_TOKENS",
	"VALIDATE_TOKENS": "@@/hacker/VALIDATE_TOKENS",

	"CREATE_RESET_HASH": "@@/hacker/CREATE_RESET_HASH",

	"GET_USERS": "@@/hacker/GET_USERS"
};

/**
 * API Middleware success action types.
 * NOTE: This action type will be dispatched from middleware
 * if the request is successful (2.x.x status), will hold data from response.
 * @type {Object}
 */
const apiSuccessTypes = {
	"AUTHENTICATED": "@@/hacker/AUTHENTICATED",
	"TOKENS_REFRESHED": "@@/hacker/TOKENS_REFRESHED",

	"CREATE_RESET_HASH_SUCCESS": "@@/hacker/CREATE_RESET_HASH_SUCCESS",

	"USERS_FETCHED": "@@/hacker/USERS_FETCHED"
};

/**
 * API Middlware failure action types.
 * NOTE: This action type will be dispatch from middleware
 * if the request fails (anything other than 2.x.x status).
 * @type {Object}
 */
const apiErrorTypes = {
	"AUTHENTICATION_ERROR": "@@/hacker/AUTHENTICATION_ERROR",
	"TOKENS_CANNOT_REFRESH": "@@/hacker/TOKENS_CANNOT_REFRESH",

	"CREATE_RESET_HASH_FAIL": "@@/hacker/CREATE_RESET_HASH_FAIL",

	"USER_FETCH_ERORR": "@@/hacker/USERS_FETCHED"
};

/**
 * Normal action types that won't be handled by middleware.
 * NOTE: Empty for now but this is where they should be placed.
 * @type {Object}
 */
const normalTypes = {
	"LOGOUT": "@@/hacker/LOGOUT",
	"BOOTSTRAP_COMPLETE": "@@/hacker/BOOTSTRAP_COMPLETE",
	"CLEAR_RESET_PASSWORD": "@@/hacker/CLEAR_RESET_PASSWORD"
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
	clearResetPassword: () => ({ type: actionTypes.CLEAR_RESET_PASSWORD })
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
			types: [actionTypes.SIGNUP_REQUEST, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
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

	getUsers: () => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.GET_USERS, actionTypes.USERS_FETCHED, actionTypes.USER_FETCH_ERORR],
			request: {
				url: `${API_SUFFIX}${USERS_ENDPOINT}`,
				method: GET,
				tokenRequired: true
			}
		}
	})
};

export const actionCreators = {
	...normalActionCreators,
	...invokeAPIActionCreators
};
