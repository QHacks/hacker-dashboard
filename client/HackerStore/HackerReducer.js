import { actionTypes } from './HackerActions';

export const reducerMount = 'hacker';

const initialState = {
	authToken: null
};

export const selectors = {
	getAuthToken: (state, action) => console.log('hello')
};

const handlers = {

};

export const reducer = (state = initialState, action) => {
	if (handlers[action.type]) handlers[action.type]();
	return state;
};
