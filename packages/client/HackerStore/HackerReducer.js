import { actionTypes } from './HackerActions';
import { API } from '../strings';

const ADMIN = 'ADMIN';
const HACKER = 'HACKER';
const PARTNER = 'PARTNER';
const SUPER_ADMIN = 'SUPER_ADMIN';

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
	isPasswordResetError: false,
	isPasswordResetLoading: false,

	isPasswordUpdated: false,
	isPasswordUpdatedError: false,
	isPasswordUpdatedLoading: false,

	loginLoading: false,
	loginError: false,

	applicationError: false,
	applicationLoading: false,
	applicationFormErrorMessages: [],

	dashboardSuccessMessages: [],
	dashboardErrorMessages: [],

	users: [],
	admins: [],

	fetchingNewTokens: false,

	bootstrapLoading: true,
	signUpLoading: false,

	applicationPage: 0,
	applicationsStatus: process.env.APPLICATIONS_STATUS,

	isAdmin: false,
	isHacker: true,
	isPartner: false,
	isSuperAdmin: false,

	applicationToReview: {},
	applicationsWithReviews: [],
	applicationsWithReviewsCount: 0,
	reviewTablePage: 0,
	settings: {},
	reviewers: [],
	emails: [],
	testEmailRecipients: {},

	rsvpLoading: false,
	rsvpSubmitted: false,
	rsvpError: false,

	withdrawError: false,

	hackersRequiringCheckIn: [],
	hackerIDToCheckIn: '',
	areHackersRequiringCheckInLoading: false,
	isHackerBeingCheckedIn: false
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
	getApplicationError: (state) => state[reducerMount].applicationError,
	getApplicationFormErrorMessages: (state) => state[reducerMount].applicationFormErrorMessages,
	getIsPasswordResetError: (state) => state[reducerMount].isPasswordResetError,
	getIsPasswordUpdatedError: (state) => state[reducerMount].isPasswordUpdatedError,
	getIsPasswordUpdatedLoading: (state) => state[reducerMount].isPasswordUpdatedLoading,
	getIsPasswordResetLoading: (state) => state[reducerMount].isPasswordResetLoading,
	getApplicationsStatus: (state) => state[reducerMount].applicationsStatus,
	getIsAdmin: (state) => state[reducerMount].isAdmin,
	getIsHacker: (state) => state[reducerMount].isHacker,
	getIsPartner: (state) => state[reducerMount].isPartner,
	getIsSuperAdmin: (state) => state[reducerMount].isSuperAdmin,
	getApplicationToReview: (state) => state[reducerMount].applicationToReview,
	getSettings: (state) => state[reducerMount].settings,
	getReviewers: (state) => state[reducerMount].reviewers,
	getDashboardSuccessMessages: (state) => state[reducerMount].dashboardSuccessMessages,
	getDashboardErrorMessages: (state) => state[reducerMount].dashboardErrorMessages,
	getApplicationsWithReviews: (state) => state[reducerMount].applicationsWithReviews,
	getApplicationsWithReviewsCount: (state) => state[reducerMount].applicationsWithReviewsCount,
	getEmails: (state) => state[reducerMount].emails,
	getAdmins: (state) => state[reducerMount].admins,
	getTestEmailRecipients: (state) => state[reducerMount].testEmailRecipients,
	getReviewTablePage: (state) => state[reducerMount].reviewTablePage,
	getRSVPLoading: (state) => state[reducerMount].rsvpLoading,
	getRSVPSubmitted: (state) => state[reducerMount].rsvpSubmitted,
	getRSVPError: (state) => state[reducerMount].rsvpError,
	getWithdrawError: (state) => state[reducerMount].withdrawError,
	getHackersRequiringCheckIn: (state) => state[reducerMount].hackersRequiringCheckIn,
	getHackerIDToCheckIn: (state) => state[reducerMount].hackerIDToCheckIn,
	getAreHackersRequiringCheckInLoading: (state) => state[reducerMount].areHackersRequiringCheckInLoading,
	getIsHackerBeingCheckedIn: (state) => state[reducerMount].isHackerBeingCheckedIn
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

		const isAdmin = user.role === ADMIN;
		const isHacker = user.role === HACKER;
		const isPartner = user.role === PARTNER;
		const isSuperAdmin = user.role === SUPER_ADMIN;

		return {
			...state,
			user,
			accessToken,
			refreshToken,
			isAdmin,
			isHacker,
			isPartner,
			isSuperAdmin,
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
		action.data = action.data || {};
		const { applicationError = true, applicationLoading = false } = action.data;
		return {
			...state,
			applicationError,
			applicationLoading
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
			isPasswordResetError: false,
			isPasswordReset: true,
			isPasswordResetLoading: false
		};
	},

	[actionTypes.CREATE_RESET_HASH_FAIL]: (state, action) => {
		return {
			...state,
			isPasswordReset: false,
			isPasswordResetError: true,
			isPasswordResetLoading: false
		};
	},

	[actionTypes.CREATE_RESET_HASH]: (state, action) => {
		return {
			...state,
			isPasswordReset: false,
			isPasswordResetError: false,
			isPasswordResetLoading: true
		};
	},

	[actionTypes.UPDATE_PASSWORD_RESET_SUCCESS]: (state, action) => {
		return {
			...state,
			isPasswordUpdated: true,
			isPasswordUpdatedError: false,
			isPasswordUpdatedLoading: false
		};
	},

	[actionTypes.UPDATE_PASSWORD_RESET]: (state, action) => {
		return {
			...state,
			isPasswordUpdated: false,
			isPasswordUpdatedError: false,
			isPasswordUpdatedLoading: true
		};
	},

	[actionTypes.UPDATE_PASSWORD_RESET_FAIL]: (state, action) => {
		return {
			...state,
			isPasswordUpdated: false,
			isPasswordUpdatedError: true,
			isPasswordUpdatedLoading: false
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
	},

	[actionTypes.APPLICATION_FORM_ERROR_MESSAGES_UPDATE]: (state, action) => {
		const { messages: applicationFormErrorMessages } = action.data;
		return {
			...state,
			applicationFormErrorMessages
		};
	},

	[actionTypes.FETCH_APPLICATION_TO_REVIEW]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.APPLICATION_TO_REVIEW_FETCHED]: (state, action) => {
		const applicationToReview = action.data || {};
		return {
			...state,
			applicationToReview
		};
	},

	[actionTypes.APPLICATION_TO_REVIEW_FETCH_ERROR]: (state, action) => {
		// TODO: Handle error
		return { ...state };
	},

	[actionTypes.FETCH_SETTINGS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.SETTINGS_FETCHED]: (state, action) => {
		const { settings } = action.data;
		return {
			...state,
			settings
		};
	},

	[actionTypes.SETTINGS_FETCH_ERROR]: (state, action) => {
		// TODO: Handle error
		return { ...state };
	},

	[actionTypes.FETCH_REVIEWERS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.REVIEWERS_FETCHED]: (state, action) => {
		const { reviewers } = action.data;
		return {
			...state,
			reviewers
		};
	},

	[actionTypes.REVIEWERS_FETCH_ERROR]: (state, action) => {
		// TODO: Handle error
		return { ...state };
	},

	[actionTypes.REASSIGN_REVIEWERS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.REVIEWERS_REASSIGNED]: (state, action) => {
		const { reviewers } = action.data;
		return {
			...state,
			reviewers
		};
	},

	[actionTypes.REVIEWERS_FETCH_ERROR]: (state, action) => {
		return { ...state };
	},

	[actionTypes.SUBMIT_APPLICATION_REVIEW]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.APPLICATION_REVIEW_SUBMITTED]: (state, action) => {
		const { user: updatedUser } = action.data; // updated user
		const { firstName, lastName } = updatedUser;
		const message = `Application review submitted for ${firstName} ${lastName}`;
		return reduceDashboardSuccessMessage(state, message);
	},

	[actionTypes.APPLICATION_REVIEW_SUBMIT_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.FETCH_APPLICATIONS_WITH_REVIEWS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.APPLICATIONS_WITH_REVIEWS_FETCHED]: (state, action) => {
		const { applicationsWithReviews } = action.data; // updated user
		return {
			...state,
			applicationsWithReviews
		};
	},

	[actionTypes.APPLICATIONS_WITH_REVIEWS_FETCH_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.FETCH_APPLICATIONS_WITH_REVIEWS_COUNT]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.APPLICATIONS_WITH_REVIEWS_COUNT_FETCHED]: (state, action) => {
		const { count: applicationsWithReviewsCount } = action.data;
		return {
			...state,
			applicationsWithReviewsCount
		};
	},

	[actionTypes.APPLICATIONS_WITH_REVIEWS_COUNT_FETCH_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.CLEAR_DASHBOARD_SUCCESS_MESSAGE]: (state, action) => {
		const { index } = action.data;
		return {
			...state,
			dashboardSuccessMessages: [
				...state.dashboardSuccessMessages.slice(0, index),
				...state.dashboardSuccessMessages.slice(index + 1)
			]
		};
	},

	[actionTypes.CLEAR_DASHBOARD_ERROR_MESSAGE]: (state, action) => {
		const { index } = action.data;
		return {
			...state,
			dashboardErrorMessages: [
				...state.dashboardErrorMessages.slice(0, index),
				...state.dashboardErrorMessages.slice(index + 1)
			]
		};
	},

	[actionTypes.FETCH_EMAILS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.EMAILS_FETCHED]: (state, action) => {
		const { emails } = action.data; // updated user
		return {
			...state,
			emails
		};
	},

	[actionTypes.EMAILS_FETCH_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.FETCH_ADMINS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.ADMINS_FETCHED]: (state, action) => {
		const { admins } = action.data;
		return {
			...state,
			admins
		};
	},

	[actionTypes.ADMINS_FETCH_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.SET_TEST_EMAIL_RECIPIENTS]: (state, action) => {
		return {
			...state,
			testEmailRecipients: {
				...state.testEmailRecipients,
				...action.data.testEmailRecipients
			}
		};
	},

	[actionTypes.SEND_EMAIL]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.EMAIL_SENT]: (state, action) => {
		const message = 'Email sent successfully!';
		return reduceDashboardSuccessMessage(state, message);
	},

	[actionTypes.EMAIL_SEND_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.SET_REVIEW_TABLE_PAGE]: (state, action) => {
		const { reviewTablePage } = action.data;
		return {
			...state,
			reviewTablePage
		};
	},

	[actionTypes.UPDATE_APPLICATION_STATUS]: (state, action) => {
		// TODO: Loading
		return { ...state };
	},

	[actionTypes.APPLICATION_STATUS_UPDATED]: (state, action) => {
		const message = 'Updated application status successfully!';
		return reduceDashboardSuccessMessage(state, message);
	},

	[actionTypes.APPLICATION_STATUS_UPDATE_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(state, errorMessage);
	},

	[actionTypes.RSVP_REQUEST]: (state, action) => {
		return {
			...state,
			rsvpError: false,
			rsvpLoading: true
		};
	},

	[actionTypes.RSVP_SUCCESS]: (state, action) => {

		const { user } = action.data;

		return {
			...state,
			user,
			rsvpError: false,
			rsvpLoading: false
		};
	},

	[actionTypes.RSVP_ERROR]: (state, action) => {
		return {
			...state,
			rsvpLoading: false,
			rsvpError: true
		};
	},

	[actionTypes.WITHDRAW_APPLICATION]: (state, action) => {
		return {
			...state,
			withdrawError: false
		};
	},

	[actionTypes.WITHDRAW_SUCCESS]: (state, action) => {
		const { user } = action.data;
		const message = 'Withdrawn application successfully!';
		return {
			...reduceDashboardSuccessMessage(state, message),
			user
		};
	},

	[actionTypes.WITHDRAW_FAIL]: (state, action) => {
		return {
			...state,
			withdrawError: true
		};
	},

	[actionTypes.FETCH_HACKERS_REQUIRING_CHECK_IN]: (state, action) => {
		return {
			...state,
			areHackersRequiringCheckInLoading: true
		};
	},

	[actionTypes.HACKERS_REQUIRING_CHECK_IN_FETCHED]: (state, action) => {
		const { hackers: hackersToCheckIn } = action.data;
		return {
			...state,
			hackersRequiringCheckIn: hackersToCheckIn,
			areHackersRequiringCheckInLoading: false
		};
	},

	[actionTypes.HACKERS_REQUIRING_CHECK_IN_FETCH_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(
			{
				...state,
				areHackersRequiringCheckInLoading: false
			},
		errorMessage
		);
	},

	[actionTypes.SET_HACKER_ID_TO_CHECK_IN]: (state, action) => {
		const { hacker: hackerIDToCheckIn } = action.data;
		return {
			...state,
			hackerIDToCheckIn
		};
	},

	[actionTypes.UPDATE_HACKER_CHECK_IN_STATUS]: (state, action) => {
		return {
			...state,
			isHackerBeingCheckedIn: true
		};
	},

	[actionTypes.HACKER_CHECK_IN_STATUS_UPDATED]: (state, action) => {
		return reduceDashboardSuccessMessage(
				{
					...state,
					isHackerBeingCheckedIn: false
				},
				'Hacker successfully checked in!'
		);
	},

	[actionTypes.HACKER_CHECK_IN_STATUS_UPDATE_ERROR]: (state, action) => {
		const { message: errorMessage } = action.data.data;
		return reduceDashboardErrorMessage(
			{
				...state,
				isHackerBeingCheckedIn: false
			},
			errorMessage
	);
	}
};

function reduceDashboardErrorMessage(state, message) {
		return reduceDashboardMessage(state, 'dashboardErrorMessages', message);
}

function reduceDashboardSuccessMessage(state, message) {
		return reduceDashboardMessage(state, 'dashboardSuccessMessages', message);
}

function reduceDashboardMessage(state, key, message) {
		return { ...state, [key]: [...state[key], message] };
}

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
