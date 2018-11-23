import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

const PrivateRoute = ({ component: ComposedComponent, types, ...rest }) => {
  class Authentication extends Component {
    handleRender(props) {
      const authenticated = true;

      if (!authenticated) {
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

      // const authType =
      //   (isAdmin && "admin") ||
      //   (isHacker && "hacker") ||
      //   (isSuperAdmin && "superAdmin");

      // let isNecessaryRole;
      // if (types) {
      //   isNecessaryRole = types.includes(authType);
      // }

      // if (types && !isNecessaryRole) return null;

      return <ComposedComponent {...props} />;
    }

    render() {
      return <Route {...rest} render={this.handleRender.bind(this)} />;
    }
  }

  return <Authentication />;
};

export default PrivateRoute;
