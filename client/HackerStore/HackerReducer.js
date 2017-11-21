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

	loginLoading: false,
	loginError: false,
	applicationError: false,
	applicationLoading: false,

	users: [],

	fetchingNewTokens: false,

	bootstrapLoading: true,
	signUpLoading: false,

	applicationPage: 0
};

/**
 * State selectors.
 * @type {Object}
 */
export const selectors = {
	getUser: (state) => state[reducerMount].user,
	getUsers: (state) => state[reducerMount].users,
	getAccessToken: (state) => state[reducerMount].accessToken,
	getIsLoginError: (state) => state[reducerMount].loginError,
	getRefreshToken: (state) => state[reducerMount].refreshToken,
	getLoginLoading: (state) => state[reducerMount].loginLoading,
	getSignUpLoading: (state) => state[reducerMount].signUpLoading,
	getAuthenticated: (state) => state[reducerMount].authenticated,
	getBootstrapLoading: (state) => state[reducerMount].bootstrapLoading,
	getFetchingNewTokens: (state) => state[reducerMount].fetchingNewTokens,
	getIsPasswordReset: (state) => state[reducerMount].isPasswordReset,
	getIsPasswordUpdated: (state) => state[reducerMount].isPasswordUpdated,
	getApplicationPage: (state) => state[reducerMount].applicationPage,
	getApplicationLoading: (state) => state[reducerMount].applicationLoading,
	getApplicationError: (state) => state[reducerMount].applicationError
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
			authenticated: true,
			loginLoading: false,
			loginError: false,
			applicationError: true,
			applicationLoading: false
		};
	},

	[actionTypes.AUTHENTICATION_ERROR]: (state, action) => {
		return {
			...state,
			loginError: true,
			loginLoading: false
		};
	},

	[actionTypes.APPLICATION_ERROR]: (state, action) => {
		return {
			...state,
			applicationError: true,
			applicationLoading: false
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

	[actionTypes.LOGIN_REQUEST]: (state, action) => {
		return {
			...state,
			loginLoading: true
		};
	},

	[actionTypes.SIGNUP_REQUEST]: (state, action) => {
		return {
			...state,
			applicationLoading: true
		};
	},

	[actionTypes.LOGOUT]: (state, action) => {
		return {
			...initialState
		};
	},

	[actionTypes.APPLICATION_PAGE_UPDATE]: (state, action) => {
		const { applicationPage } = action.data;
		return {
			...state,
			applicationPage
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
