import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createHackerMiddleware } from './HackerStore/HackerMiddleware';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import {
	rootSaga as hackerSaga,
	reducer as hackerReducer,
	reducerMount as HACKER_MOUNT
} from './HackerStore';

// reducer mount for redux form reducer
const FORM_MOUNT = 'form';

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Options passed into the store.
 * NOTE: Configure these options for different use cases.
 * NOTE: i.e. React Native would use AsyncStorage.
 * @type {Object}
 */
const reduxOptions = {
	getValue: key => Promise.resolve(localStorage.getItem(key)),
	setValue: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
	removeValue: key => Promise.resolve(localStorage.removeItem(key))
};

/**
 * Sets the up the redux store for use.
 * @param {Object} opt Options passed into the store.
 * @return {Store} The redux store.
 */
const getStore = opt => {

	const sagaMiddleware = createSagaMiddleware();
	const hackerMiddleware = createHackerMiddleware();

	const store = createStore(
	combineReducers({
		[HACKER_MOUNT]: hackerReducer,
		[FORM_MOUNT]: formReducer
	}),
	compose(
			applyMiddleware(
				sagaMiddleware,
				hackerMiddleware
			),
			!IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__ ?
			window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
		)
	);

	sagaMiddleware.run(hackerSaga, opt);

	return store;
};

export default getStore(reduxOptions);
