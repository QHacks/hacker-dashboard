import { Route, Link, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import { selectors } from '../../HackerStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';
import Apply from '../Apply/Apply';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/apply" component={Apply} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		authenticated: selectors.getAuthenticated(state)
	};
};

export default connect(mapStateToProps, null)(App);
