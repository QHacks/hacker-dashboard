import { actionCreators } from '../../HackerStore';
import LoginForm from '../utils/LoginForm';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { login } = actionCreators;

class Login extends Component {

	constructor(props) {
		super(props);
		
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(values) {
		const { login } = this.props;

		login(values);
	}

	render() {
		return (
			<div>
				<LoginForm onSubmit={ this.handleLogin } />
				<Link to="/apply">Need an account? Apply now!</Link>
			</div>
		);
	}
}

export default connect(state => state, { login })(Login);
