import { actionTypes } from './HackerActions';
import { selectors } from './HackerReducer';
import axios from 'axios';

let accessToken;
let options = {};
let store;

// Unauthorized status code response
const UNAUTHORIZED_STATUS = 401;

/**
 * Checks if the action should be handled by the middleware.
 * @param {Object} action The incoming action to be checked.
 * @return {Boolean} True if the action should be handled by middleware.
 */
function isHackerMiddlewareAction(action) {
	return action.type === actionTypes.INVOKE_API_CALL;
}

/**
 * Checks if the error reponse from the server is a result of a token bounce.
 * @param {Object} error The error from the server.
 * @return {Boolean} True if error is result of token, false otherwise.
 */
function isTokenFailError(error, incomingRequestType) {
	if (incomingRequestType === actionTypes.LOGIN_REQUEST || incomingRequestType === actionTypes.SIGNUP_REQUEST) {
		return false;
	} else if (error.status === UNAUTHORIZED_STATUS) {
		return true;
	}
	return false;
}

/**
 * Creates request headers for the specific api request.
 * @param {Object} requestInfo Request information object.
 * @return {Object} The headers object for the request.
 */
function createHeaders(requestInfo) {
	let headers = {
		'Content-Type': 'application/json'
	};

	const { tokenRequired } = requestInfo;

	if (tokenRequired) {
		accessToken = selectors.getAccessToken(store.getState());

		headers = {
			...headers,
			'Authorization': `Bearer ${accessToken}`
		};
	}

	return headers;
}

/**
 * Makes request to server, as defined by incoming middleware action.
 * @param {Object} requestInfo Request information, url, method, body etc.
 * @return {Promise} Resultanct promise from axios request.
 */
function makeAPIRequest(requestInfo) {
	const { method, url, body } = requestInfo;

	const headers = createHeaders(requestInfo);

	if (body) {
		return axios({ method, url, data: body, headers});
	}

	return axios({ method, url, headers });
}

/**
 * Handles a hacker middleware action.
 * @param {Object} action Middleware action.
 */
function handleAction(action) {

	const { request } = action.data;
	const [ requestType, successType, failureType ] = action.data.types;

	store.dispatch({ type: requestType });

	makeAPIRequest(request).then((response) => {
		store.dispatch({ type: successType, data: response.data });
	}).catch((error) => {
		const { response } = error;

		if (isTokenFailError(response, requestType)) {
			store.dispatch({ type: actionTypes.INVOKE_API_FAIL, data: { response, initialAction: action }});
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
