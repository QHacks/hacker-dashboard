import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import React, { Component } from 'react';
import Login from '../Login/Login';
import Apply from '../Apply/Apply';

export default class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/apply" component={Apply} />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/" component={Dashboard} />
					<Route path="*" component={() => (<div>No Match</div>)} />
				</Switch>
			</div>
		);
	}
}
