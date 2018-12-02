import { Route as ReactRouterRoute, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const GET_AUTHENTICATION_STATUS = gql`
  query {
    authInfo @client {
      isAuthenticated
    }
  }
`;

const Route = ({ component: ComposedComponent, type, ...rest }) => {
  class Authentication extends Component {
    getRedirectPath() {
      const locationState = props.location.state;

      if (locationState && locationState.from.pathname) {
        return locationState.from.pathname;
      }

      return "/profile";
    }

    handleRender(props) {
      const { isAuthenticated } = this.props.data.authInfo;

      if (type || type !== "wildcard") {
        if (!isAuthenticated && type === "private") {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                  message: "You need to login!"
                }
              }}
            />
          );
        } else if (isAuthenticated && type === "public") {
          return (
            <Redirect
              to={{
                pathname: "/profile",
                state: {
                  from: props.location,
                  message: "Cannot access public pages while logged in!"
                }
              }}
            />
          );
        }
      }

      return <ComposedComponent {...props} />;
    }

    render() {
      return (
        <ReactRouterRoute {...rest} render={this.handleRender.bind(this)} />
      );
    }
  }

  const AuthenticationContainer = graphql(GET_AUTHENTICATION_STATUS)(
    Authentication
  );

  return <AuthenticationContainer />;
};

export default Route;
