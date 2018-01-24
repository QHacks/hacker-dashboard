import { Route, Redirect } from 'react-router-dom';
import { selectors } from '../../HackerStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const { getAuthenticated, getIsAdmin, getIsHacker, getIsPartner } = selectors;

const PrivateRoute = ({ component: ComposedComponent, types, ...rest }) => {

    class Authentication extends Component {

        handleRender(props) {
            const { authenticated, isAdmin, isHacker, isPartner  } = this.props;

            if (!authenticated) {
                return (
                    <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location,
                            message: 'You need to login!'
                        }
                    }}/>
                );
            }

            const authType = (isAdmin && 'admin') || (isHacker && 'hacker') || (isPartner && 'partner');
            let isNecessaryRole;
            if (types) {
                isNecessaryRole = types.includes(authType);
            }

            if (types && !isNecessaryRole) return null;

            return <ComposedComponent {...props}/>;
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
            authenticated: getAuthenticated(state),
            isAdmin: getIsAdmin(state),
            isHacker: getIsHacker(state),
            isPartner: getIsPartner(state)
        };
    }

    const AuthenticationContainer = connect(mapStateToProps)(Authentication);

    return <AuthenticationContainer/>;
};

export default PrivateRoute;
