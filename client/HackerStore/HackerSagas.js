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
		bootstrapSaga(opt),
		logoutSaga(opt),
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
	yield take(actionTypes.LOGOUT);

	yield call(opt.removeValue, ACCESS_TOKEN_STORAGE);
	yield call(opt.removeValue, REFRESH_TOKEN_STORAGE);
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

	console.log("You have been authenticated!");

	// in loop wait api token fail (trigger refresh), dispatch buffered api calls

	// while (true) {
	// waiting for a call or fail
	// three states
	// 	- getting token
	// 	- have token
	// 	- don't have token
	// }
}
