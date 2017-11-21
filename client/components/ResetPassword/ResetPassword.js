import ResetPasswordForm from '../utils/ResetPasswordForm';
import { Divider, Header } from 'semantic-ui-react';
import { actionCreators, selectors } from '../../HackerStore';
import { Link } from 'react-router-dom';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ResetPassword.less';

const { createResetHash, clearResetPassword } = actionCreators;
const { getIsPasswordReset, getIsPasswordResetError, getIsPasswordResetLoading } = selectors;

class ResetPassword extends Component {

	handleResetPassword(values) {
		this.props.createResetHash(values);
	}

	renderResetPasswordHeader() {
		return (
			<div className="reset-header">
				<img
					src={require('../../assets/img/qhacks-tricolor-logo.svg')}
					className="qhacks-logo"
				/>
				<Header as="h2"
					content="Reset Password"
					color="red"
					textAlign="center"
					className="form apply header"
				/>
				<p>Please provide the email associated with your account to reset your password.</p>
			</div>
		);
	}

	renderResetPasswordForm() {
		const { isPasswordReset, isPasswordResetLoading, isPasswordResetError } = this.props;
		return (
			<ResetPasswordForm onSubmit={ this.handleResetPassword.bind(this) } linkSent={isPasswordReset} resetError={isPasswordResetError} resetLoading={isPasswordResetLoading} />
		);
	}

	renderResetPasswordFooter() {
		return (
			<div className="application-footer">
				<Divider />
				<p className="fontSize-medium textAlign-center">
					Know your password? <Link to="/login">Login here</Link>
				</p>
			</div>
		);
	}

	render() {
		return (
			<div className="reset-container">
				<div className="reset-form-container">
					{this.renderResetPasswordHeader()}
					{this.renderResetPasswordForm()}
					{this.renderResetPasswordFooter()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		isPasswordReset: getIsPasswordReset(state),
		isPasswordResetError: getIsPasswordResetError(state),
		isPasswordResetLoading: getIsPasswordResetLoading(state)
	};
}

export default connect(mapStateToProps, { createResetHash })(ResetPassword);
