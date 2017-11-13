import { actionCreators, selectors } from '../../HackerStore';
import { Redirect, Link } from 'react-router-dom';
import ApplyForm from '../utils/ApplyForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const { apply } = actionCreators;

class Apply extends Component {

	handleApply(values) {
		const { apply } = this.props;

		apply(values);
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
				<ApplyForm onSubmit={ this.handleApply.bind(this) } />
				<Link to="/login">Have an account?</Link>
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

export default connect(mapStateToProps, { apply })(Apply);
