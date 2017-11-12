import { Route, Redirect } from 'react-router-dom';
import { selectors } from '../../HackerStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const PrivateRoute = ({component: ComposedComponent, ...rest}) => {

	class Authentication extends Component {

		handleRender(props) {
			if (!this.props.authenticated) {
				return <Redirect to={{
					pathname: '/login',
					state: {
						from: props.location,
						message: 'You need to login!'
					}
				}} />;
			} else {
				return <ComposedComponent {...props}/>;
			}
		}

		render() {
			return (
				<Route {...rest} render={this.handleRender.bind(this)}/>
			);
		}
	}

	function mapStateToProps(state, ownProps) {
		return {
			...ownProps,
			authenticated: selectors.getAuthenticated(state)
		};
	}

	const AuthenticationContainer = connect(mapStateToProps)(Authentication);

	return <AuthenticationContainer />;
};

export default PrivateRoute;
