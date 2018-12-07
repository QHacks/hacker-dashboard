import { Route as ReactRouterRoute, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const AUTHENTICATION_STATUS_QUERY = gql`
  query {
    authInfo @client {
      isAuthenticated
    }
  }
`;

const Route = ({ component: ComposedComponent, type, ...rest }) => {
  class Authentication extends Component {
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
                  alert: {
                    type: "info",
                    message: "You must login first to view that page!",
                    status: "Oops!"
                  }
                }
              }}
            />
          );
        } else if (isAuthenticated && type === "public") {
          return (
            <Redirect
              to={{
                pathname: "/profile",
                alert: {
                  type: "info",
                  message: "You cannot access public pages while logged in!",
                  status: "Oops!"
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

  const AuthenticationContainer = graphql(AUTHENTICATION_STATUS_QUERY)(
    Authentication
  );

  return <AuthenticationContainer />;
};

export default Route;
