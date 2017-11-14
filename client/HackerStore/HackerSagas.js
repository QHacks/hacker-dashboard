import { put, take, all, call, select } from 'redux-saga/effects';
import { hackerMiddlwareActionTypes } from './HackerMiddleware';
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
		logoutSaga(opt),
		bootstrapSaga(opt),
		middlewareSaga(opt)
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
 * Refresh token saga, takes care serializing token actions.
 * @param {Object} opt Options object passed into saga.
 * @return {Generator}
 */
function* refreshTokensSaga(opt) {
	while (true) {
		const tokenAction = yield take([actionTypes.REFRESH_TOKENS, actionTypes.TOKENS_REFRESHED, actionTypes.TOKENS_CANNOT_REFRESH]);


	}
}

/**
 * Middleware saga, handles logic for refresh buffer.
 * @return {Generator}
 */
function* middlewareSaga(opt) {
	const bootstrapComplete = yield take(actionTypes.BOOTSTRAP_COMPLETE);

	const accessToken = bootstrapComplete.data.accessToken;
	const refreshToken = bootstrapComplete.data.refreshToken;

	if (refreshToken) yield put(actionCreators.validateToken(refreshToken));

	const auth = yield take(actionTypes.AUTHENTICATED);

	yield call(opt.setValue, ACCESS_TOKEN_STORAGE, auth.data.accessToken);
	yield call(opt.setValue, REFRESH_TOKEN_STORAGE, auth.data.refreshToken);

	const buffer = [];

	while (true) {
		const action = yield take([ hackerMiddlwareActionTypes.INVOKE_API_CALL, hackerMiddlwareActionTypes.INVOKE_API_FAIL]);

		while (shitsFucked()) {
			switch (action.type) {
				case hackerMiddlwareActionTypes.INVOKE_API_CALL:
						// check state, if we are getting tokens buffer, if we are
					break;
				case hackerMiddlwareActionTypes.INVOKE_API_FAIL:
						// buffer initialAction
						// trigger refresh tokens
					break;
			}
		}

	}
}
