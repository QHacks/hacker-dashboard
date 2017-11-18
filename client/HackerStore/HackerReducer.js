import { actionTypes } from './HackerActions';

export const reducerMount = 'hacker';

/**
 * Initial state for the store.
 * @type {Object}
 */
const initialState = {
	user: {},
	accessToken: null,
	refreshToken: null,
	authenticated: false,

	isPasswordReset: false,
	isPasswordUpdated: false,

	users: [],

	fetchingNewTokens: false,

	bootstrapLoading: true,
	loginLoading: false,
	signUpLoading: false
};

/**
 * State selectors.
 * @type {Object}
 */
export const selectors = {
	getUser: (state) => state[reducerMount].user,
	getUsers: (state) => state[reducerMount].users,
	getAccessToken: (state) => state[reducerMount].accessToken,
	getRefreshToken: (state) => state[reducerMount].refreshToken,
	getLoginLoading: (state) => state[reducerMount].loginLoading,
	getSignUpLoading: (state) => state[reducerMount].signUpLoading,
	getAuthenticated: (state) => state[reducerMount].authenticated,
	getBootstrapLoading: (state) => state[reducerMount].bootstrapLoading,
	getFetchingNewTokens: (state) => state[reducerMount].fetchingNewTokens,
	getIsPasswordReset: (state) => state[reducerMount].isPasswordReset,
	getIsPasswordUpdated: (state) => state[reducerMount].isPasswordUpdated
};

/**
 * Reducer handlers.
 * @type {Object}
 */
const handlers = {
	[actionTypes.BOOTSTRAP_COMPLETE]: (state, action) => {
		const { refreshToken, accessToken } = action.data;

		return {
			...state,
			accessToken,
			refreshToken,
			bootstrapLoading: false
		};
	},

	[actionTypes.AUTHENTICATED]: (state, action) => {
		const { refreshToken, accessToken, user } = action.data;

		return {
			...state,
			user,
			accessToken,
			refreshToken,
			authenticated: true
		};
	},

	[actionTypes.TOKENS_REFRESHED]: (state, action) => {
		const { refreshToken, accessToken, user } = action.data;

		return {
			...state,
			user,
			accessToken,
			refreshToken,
			authenticated: true,
			fetchingNewTokens: false
		};
	},

	[actionTypes.REFRESH_TOKENS]: (state, action) => {
		return {
			...state,
			fetchingNewTokens: true
		};
	},

	[actionTypes.USERS_FETCHED]: (state, action) => {
		const { users } = action.data;
		return {
			...state,
			users
		};
	},

	[actionTypes.CREATE_RESET_HASH_SUCCESS]: (state, action) => {
		return {
			...state,
			isPasswordReset: true
		};
	},

	[actionTypes.CLEAR_RESET_PASSWORD]: (state, action) => {
		return {
			...state,
			isPasswordReset: false
		};
	},

	[actionTypes.UPDATE_PASSWORD_RESET_SUCCESS]: (state, action) => {
		return {
			...state,
			isPasswordUpdated: true
		};
	},

	[actionTypes.LOGOUT]: (state, action) => {
		return {
			...initialState
		};
	}
};

/**
 * Actual reducer export.
 * @param {Object} [state=initialState] Current state to be reduced.
 * @param {Object} action Incoming action for reducing.
 * @return {Object} New state object after reduction.
 */
export function reducer(state = initialState, action) {
	if (handlers[action.type]) return handlers[action.type](state, action);
	return state;
}
