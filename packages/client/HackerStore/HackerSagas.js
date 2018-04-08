import { put, take, all, call, select } from 'redux-saga/effects';
import { actionCreators, actionTypes } from './HackerActions';
import { selectors } from './HackerReducer';

const ACCESS_TOKEN_STORAGE = 'qhacksAccessToken';
const REFRESH_TOKEN_STORAGE = 'qhacksRefreshToken';

/**
 * Root saga that runs all of our sagas.
 * @param {Object} opt Options object passed to sagas.
 * @return {Generator}
 */
export function* rootSaga(opt) {
	yield all([
		authSaga(opt),
		logoutSaga(opt),
		bootstrapSaga(opt),
		middlewareSaga(opt),
		reloadApplicationToReviewSaga(opt)
	]);
}

/**
 * Bootstrap saga, used for initial application setup.
 * NOTE: Checks local storage for saved tokens.
 * @param {Object} opt Saga options.
 * @return {Generator}
 */
function* bootstrapSaga(opt) {

	const accessToken = yield call(opt.getValue, ACCESS_TOKEN_STORAGE);
	const refreshToken = yield call(opt.getValue, REFRESH_TOKEN_STORAGE);

	yield put(actionCreators.bootstrapComplete({ accessToken, refreshToken }));
}

/**
 * Authentication saga, handles bootstrap completion, auth and refresh token saving.
 * @param {Object} opt Options passed into the saga.
 * @return {Generator}
 */
function* authSaga(opt) {
	const bootstrapComplete = yield take(actionTypes.BOOTSTRAP_COMPLETE);

	const accessToken = bootstrapComplete.data.accessToken;
	const refreshToken = bootstrapComplete.data.refreshToken;

	if (refreshToken) yield put(actionCreators.validateToken(refreshToken));

	while (true) {
		const auth = yield take([actionTypes.AUTHENTICATED, actionTypes.TOKENS_REFRESHED]);

		yield call(opt.setValue, ACCESS_TOKEN_STORAGE, auth.data.accessToken);
		yield call(opt.setValue, REFRESH_TOKEN_STORAGE, auth.data.refreshToken);
	}
}

/**
 * Middleware saga, handles logic for refresh buffer.
 * NOTE: This implementation is specific to our middleware.
 * @return {Generator}
 */
function* middlewareSaga(opt) {

	let buffer = [];

	while (true) {
		const action = yield take([actionTypes.INVOKE_API_CALL, actionTypes.INVOKE_API_FAIL, actionTypes.TOKENS_REFRESHED]);

		// when tokens have successfully been refreshed dispatch buffered actions
		if (action.type === actionTypes.TOKENS_REFRESHED) {
			if (buffer.length) {
				for (const bufferedAction of buffer) {
					yield put(bufferedAction);
				}
			}
			buffer = []; // reset buffer
		}

		// when receive an api action check if we need to buffer
		if (action.type === actionTypes.INVOKE_API_CALL) {
			const fetchingTokens = yield select(selectors.getFetchingNewTokens);

			if (fetchingTokens) {
				buffer.unshift(action);
			}
		}

		// when api request fails due to a bad token, buffer initial action and begin refresh
		if (action.type === actionTypes.INVOKE_API_FAIL) {
			const { initialAction } = action.data;
			const [requestType] = initialAction.data.types;

			// if the api failed on refresh token request we know tokens are invalid, log user out immediately
			if (requestType === actionTypes.REFRESH_TOKENS) {
				buffer = [];
				yield put(actionCreators.logout());
			} else if (initialAction && requestType !== actionTypes.VALIDATE_TOKENS) {
				// buffer initial action that caused the token bounce
				buffer.unshift(initialAction);

				const refreshToken = yield select(selectors.getRefreshToken);

				// attempt to refresh tokens
				yield put(actionCreators.refresh(refreshToken));
			}
		}
	}
}

/**
 * Logout saga, checks for logout action and removes tokens from storage.
 * @param {Object} opt Options object passed into saga.
 * @return {Generator}
 */
function* logoutSaga(opt) {
	while (true) {
		yield take(actionTypes.LOGOUT);

		yield call(opt.removeValue, ACCESS_TOKEN_STORAGE);
		yield call(opt.removeValue, REFRESH_TOKEN_STORAGE);
	}
}

/**
 * Reload application to review saga attempts to fetch a new application to review from the API
 * after an application review has been submitted.
 * @param {Object} opt Options object passed into saga.
 * @return {Generator}
 */
function* reloadApplicationToReviewSaga(opt) {
	while (true) {
		yield take(actionTypes.APPLICATION_REVIEW_SUBMITTED);
		yield put(actionCreators.fetchApplicationToReview());
	}
}
