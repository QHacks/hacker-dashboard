import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ClientStore';
import ReactDOM from 'react-dom';
import App from './App/App';
import React from 'react';

const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	rootElement
);
