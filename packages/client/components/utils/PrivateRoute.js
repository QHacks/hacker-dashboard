import { Route, Redirect } from "react-router-dom";
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

const PrivateRoute = ({ component: ComposedComponent, types, ...rest }) => {
  class Authentication extends Component {
    handleRender(props) {
      const { isAuthenticated } = this.props.data.authInfo;

      if (!isAuthenticated) {
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
      }

      return <ComposedComponent {...props} />;
    }

    render() {
      return <Route {...rest} render={this.handleRender.bind(this)} />;
    }
  }

  const AuthenticationContainer = graphql(GET_AUTHENTICATION_STATUS)(
    Authentication
  );

  return <AuthenticationContainer />;
};

export default PrivateRoute;
