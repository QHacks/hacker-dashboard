import UpdatePasswordForm from '../utils/UpdatePasswordForm';
import { Divider, Header, Message, Button } from 'semantic-ui-react';
import { actionCreators, selectors } from '../../HackerStore';
import { Link } from 'react-router-dom';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UpdatePassword.less';

const { updatePasswordForReset } = actionCreators;
const { getIsPasswordUpdated, getIsPasswordUpdatedError, getIsPasswordUpdatedLoading } = selectors;

class UpdatePassword extends Component {

	handleUpdatePasswordForReset(values) {
		const { password } = values;
		const { hash } = this.props.match.params;

		this.props.updatePasswordForReset(hash, password);
	}


	renderPasswordUpdateHeader() {
		const { isPasswordUpdated } = this.props;

		return (
			<div className="update-header">
				<img
					src={require('../../assets/img/qhacks-tricolor-logo.svg')}
					className="qhacks-logo"
				/>
				<Header as="h2"
					content="Update Password"
					color="red"
					textAlign="center"
					className="form apply header"
				/>
				{(isPasswordUpdated)
					? null
					: <p>Please enter your new password to complete the reset password process.</p>
				}
			</div>
		);
	}

	renderPasswordUpdateForm() {
		const { isPasswordUpdated, isPasswordUpdatedError,  isPasswordUpdatedLoading} = this.props;
		if (isPasswordUpdated) {
			return (
					<Message
						success
						size="small"
						header='Password Update Successful!'
						content="Congratulations your password has been updated. Please proceed to login."
					/>
			);
		}
		return (
			<UpdatePasswordForm onSubmit={ this.handleUpdatePasswordForReset.bind(this) } updateError={isPasswordUpdatedError} updateLoading={isPasswordUpdatedLoading} />
		);
	}

	renderPasswordUpdateFooter() {
		return (
			<div className="update-footer">
				<Divider />
				<p className="fontSize-medium textAlign-center">
					Wrong place? <Link to="/login">Login here</Link>
				</p>
			</div>
		);
	}

	render() {
		return (
			<div className="update-container">
				<div className="update-form-container">
					{this.renderPasswordUpdateHeader()}
					{this.renderPasswordUpdateForm()}
					{this.renderPasswordUpdateFooter()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		isPasswordUpdated: getIsPasswordUpdated(state),
		isPasswordUpdatedError: getIsPasswordUpdatedError(state),
		isPasswordUpdatedLoading: getIsPasswordUpdatedLoading(state)
	};
}

export default connect(mapStateToProps, { updatePasswordForReset })(UpdatePassword);
