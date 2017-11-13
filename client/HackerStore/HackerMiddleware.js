import axios from 'axios';

export const INVOKE_API = "hackerMiddlewareAction";

const API_TOKEN_FAIL = '@@/hacker/API_TOKEN_FAIL';

/**
 * Checks if the action should be handled by the middleware.
 * @param {Object} action The incoming action to be checked.
 * @return {Boolean} True if the action should be handled by middleware.
 */
function isHackerMiddlewareAction(action) {
	return action.hasOwnProperty(INVOKE_API);
}

let accessToken;
let refreshToken;
let store;
let options = {};

// needs to take into account headers, content type and bearer token for auth

/**
 * Handles a hacker middleware action.
 * @param {Object} action Middleware action.
 */
function handleAction(action) {

	const requestAction = action[INVOKE_API];
	const { url, method, body } = requestAction.data;
	const [ requestType, successType, failureType ] = requestAction.types;

	store.dispatch({ type: requestType });

	axios({ method, url, data: body, headers: {
		'Content-Type': 'application/json'
	} }).then((res) => {
		const { data } = res;
		store.dispatch({ type: successType, data });
	}).catch((err) => {
		store.dispatch({ type: failureType, data: err });
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
