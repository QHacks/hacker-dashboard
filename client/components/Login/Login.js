import { actionCreators, selectors } from '../../HackerStore';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../utils/LoginForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const { login } = actionCreators;

class Login extends Component {

	handleLogin(values) {
		this.props.login(values);
	}

	getRedirectPath() {
		const locationState = this.props.location.state;
		if (locationState && locationState.from.pathname) {
			return locationState.from.pathname;
		}
		return '/dashboard';
	}

	render() {
		const { authenticated } = this.props;

		if (authenticated) {
			return (
				<Redirect to={{
					pathname: this.getRedirectPath(), state: {
						from: this.props.location
					}
				}}/>
			);
		}
		return (
			<div>
				<LoginForm onSubmit={ this.handleLogin.bind(this) } />
				<Link to="/apply">Need an account? Apply now!</Link>
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

export default connect(mapStateToProps, { login })(Login);
