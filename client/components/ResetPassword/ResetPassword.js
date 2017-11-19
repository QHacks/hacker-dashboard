import ResetPasswordForm from '../utils/ResetPasswordForm';
import { actionCreators, selectors } from '../../HackerStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const { createResetHash, clearResetPassword } = actionCreators;
const { getIsPasswordReset } = selectors;

class ResetPassword extends Component {

	handleResetPassword(values) {
		this.props.createResetHash(values);
	}

	handleResendEmail() {
		this.props.clearResetPassword();
	}

	render() {
		const { isPasswordReset } = this.props;

		if (isPasswordReset) {
			return (
				<div>
					<p>An email has been sent to the address you provided containing a link to reset your password.</p>
					<a onClick={this.handleResendEmail.bind(this)}>Re-send Email</a>
				</div>
			);
		}

		return (
			<div>
				<ResetPasswordForm onSubmit={ this.handleResetPassword.bind(this) } />
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		isPasswordReset: getIsPasswordReset(state)
	};
}

export default connect(mapStateToProps, { createResetHash, clearResetPassword })(ResetPassword);
