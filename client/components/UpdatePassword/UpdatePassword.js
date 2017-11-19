import UpdatePasswordForm from '../utils/UpdatePasswordForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators, selectors } from '../../HackerStore';
import { Link } from 'react-router-dom';

const { getIsPasswordUpdated } = selectors;
const { updatePasswordForReset } = actionCreators;

class UpdatePassword extends Component {

	handleUpdatePasswordForReset(values) {
		const { password } = values;
		const { hash } = this.props.match.params;

		this.props.updatePasswordForReset(hash, password);
	}

	render() {
		const { isPasswordUpdated } = this.props;

		if (isPasswordUpdated) {
			return (
				<div>
					<p>Your password has been updated!</p>
					<Link to="/login">Login now!</Link>
				</div>
			);
		}

		return (
			<div>
				<UpdatePasswordForm onSubmit={ this.handleUpdatePasswordForReset.bind(this) } />
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		isPasswordUpdated: selectors.getIsPasswordUpdated(state)
	};
}

export default connect(mapStateToProps, { updatePasswordForReset })(UpdatePassword);
