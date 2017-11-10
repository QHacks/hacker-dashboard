import { INVOKE_API } from './HackerMiddleware';

// Request Methods
const POST = 'POST';
const GET = 'GET';

// API Endpoint Constants
const API_SUFFIX = '/api/v1';
const LOGIN_ENDPOINT = '/auth/session';
const SIGNUP_ENDPOINT = '/auth/signup';
const REFRESH_ENDPOINT = '/auth/refresh';

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
	"VALIDATE_TOKENS": "@@/hacker/VALIDATE_TOKENS"
};

/**
 * API Middleware success action types.
 * NOTE: This action type will be dispatched from middleware
 * if the request is successful (2.x.x status), will hold data from response.
 * @type {Object}
 */
const apiSuccessTypes = {
	"AUTHENTICATED": "@@/hacker/AUTHENTICATED",
	"TOKENS_UPDATED": "@@/hacker/TOKENS_UPDATED"
};

/**
 * API Middlware failure action types.
 * NOTE: This action type will be dispatch from middleware
 * if the request fails (anything other than 2.x.x status).
 * @type {Object}
 */
const apiErrorTypes = {
	"AUTHENTICATION_ERROR": "@@/hacker/AUTHENTICATION_ERROR"
};

/**
 * Normal action types that won't be handled by middleware.
 * NOTE: Empty for now but this is where they should be placed.
 * @type {Object}
 */
const normalTypes = {
	"BOOTSTRAP_COMPLETE": "@@/hacker/BOOTSTRAP_COMPLETE"
};

export const actionTypes = {
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
	bootstrapComplete: data => ({ type: actionTypes.BOOTSTRAP_COMPLETE, data })
};

/**
 * Action creators that trigger API middleware.
 * NOTE: Action objects must have a INVOKE_API key.
 * @type {Object}
 */
const invokeAPIActionCreators = {
	login: credentials => ({
		[INVOKE_API]: {
			types: [actionTypes.LOGIN_REQUEST, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
			data: {
				url: `${API_SUFFIX}${LOGIN_ENDPOINT}`,
				method: POST,
				body: credentials
			}
		}
	}),

	apply: signUpInfo => ({
		[INVOKE_API]: {
			types: [actionTypes.SIGNUP_REQUEST, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
			data: {
				url: `${API_SUFFIX}${SIGNUP_ENDPOINT}`,
				method: POST,
				body: signUpInfo
			}
		}
	}),

	validateToken: refreshToken => ({
		[INVOKE_API]: {
			types: [actionTypes.VALIDATE_TOKENS, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
			data: {
				url: `${API_SUFFIX}${REFRESH_ENDPOINT}`,
				method: POST,
				body: { refreshToken }
			}
		}
	}),

	refresh: refreshToken => ({
		[INVOKE_API]: {
			types: [actionTypes.REFRESH_TOKENS, actionTypes.TOKENS_UPDATED, actionTypes.AUTHENTICATION_ERROR],
			data: {
				url: `${API_SUFFIX}${REFRESH_ENDPOINT}`,
				method: POST,
				body: { refreshToken }
			}
		}
	})
};

export const actionCreators = {
	...normalActionCreators,
	...invokeAPIActionCreators
};
