import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {
	reducer as hackerReducer,
	reducerMount as HACKER_MOUNT } from './HackerStore';

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Create the redux store.
 * @param {Object} opt Any options passed into the store.
 * @return {Store} The created Redux store.
 */
const getStore = opt => {
	const store = createStore(
		combineReducers({
			[HACKER_MOUNT]: hackerReducer
		}),
		compose(
			applyMiddleware(thunk,
				!IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
			)
		)
	);
};

export default getStore();
