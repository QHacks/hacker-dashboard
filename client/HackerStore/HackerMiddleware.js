import axios from 'axios';

let options = {};
let store;

// Unauthorized status code response
const UNAUTHORIZED_STATUS = 401;

/**
 * Specific middleware action types.
 * @type {Object}
 */
export const hackerMiddlwareActionTypes = {
	"INVOKE_API_CALL": "@@/hackerMiddleware/INVOKE_API_CALL",
	"INVOKE_API_FAIL": "@@/hackerMiddleware/INVOKE_API_FAIL"
};

/**
 * Checks if the action should be handled by the middleware.
 * @param {Object} action The incoming action to be checked.
 * @return {Boolean} True if the action should be handled by middleware.
 */
function isHackerMiddlewareAction(action) {
	return action.type === hackerMiddlwareActionTypes.INVOKE_API;
}

/**
 * Checks if the error reponse from the server is a result of a token bounce.
 * @param {Object} error The error from the server.
 * @return {Boolean} True if error is result of token, false otherwise.
 */
function isTokenFailError(error) {
	if (error.status === UNAUTHORIZED_STATUS) {
		return true;
	}
	return false;
}

/**
 * Makes request to server, as defined by incoming middleware action.
 * @param {Object} requestInfo Request information, url, method, body etc.
 * @return {Promise} Resultanct promise from axios request.
 */
function makeAPIRequest(requestInfo) {
	const { method, url, body } = requestInfo;

	return axios({ method, url, data: body, headers: {
		'Content-Type': 'application/json'
	}});
}

/**
 * Handles a hacker middleware action.
 * @param {Object} action Middleware action.
 */
function handleAction(action) {

	const [ requestType, successType, failureType ] = action.data.types;

	store.dispatch({ type: requestType });

	makeAPIRequest(action.data.request).then((response) => {
		store.dispatch({ type: successType, data: response.data });
	}).catch((error) => {
		const { response } = error;

		if (isTokenFailError(response)) {
			store.dispatch({ type: hackerMiddlwareActionTypes.INVOKE_API_FAIL, data: { response, initialAction: action }});
		} else {
			store.dispatch({ type: failureType, data: response });
		}
	});
}

/**
 * Creates the hacker middleware.
 * @param {Object} opt Middleware options object.
 * @return {Function} Middleware function.
 */
export function createHackerMiddleware(opt) {
	return (storeRef) => {
				store = storeRef;
				options = opt;

				return (next) => (action) => {
						if (isHackerMiddlewareAction(action)) handleAction(action);
						next(action);
				};
		};
}
