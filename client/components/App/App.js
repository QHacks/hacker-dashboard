import UpdatePassword from '../UpdatePassword';
import ResetPassword from '../ResetPassword';
import { Route, Switch } from 'react-router-dom';
import AdminRoute from '../utils/AdminRoute';
import PrivateRoute from '../utils/PrivateRoute';
import Dashboard from '../Dashboard';
import React, { Component } from 'react';
import Login from '../Login';
import Apply from '../Apply';
import Admin from '../Admin';

export default class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/apply" component={Apply} />
					<Route path="/login" component={Login} />
					<Route path="/reset-password" component={ResetPassword} />
					<Route path="/update-password/:hash" component={UpdatePassword} />
					<AdminRoute path="/admin" component={Admin} />
					<PrivateRoute path="/" component={Dashboard} />
					<Route path="*" component={() => (<div>No Match</div>)} />
				</Switch>
			</div>
		);
	}
}
