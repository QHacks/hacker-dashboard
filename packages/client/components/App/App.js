import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import UpdatePassword from "../UpdatePassword";
import ResetPassword from "../ResetPassword";
import React, { Component } from "react";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Apply from "../Apply";
import "normalize.css";

export default class App extends Component {
  render() {
    return (
      <div
        css={`
          * {
            font-family: "Encode Sans", sans-serif !important;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            color: #020b1b;
          }
          h2,
          h3,
          h4 {
            font-weight: 600;
            margin: 16px 0;
          }
          strong {
            font-weight: 600;
          }
          h1 {
            font-weight: 800;
            margin: 16px 0;
          }
        `}
      >
        <Switch>
          {/* Public routes */}
          <Route path="/apply" component={Apply} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/update-password/:hash" component={UpdatePassword} />

          {/* Authenticated routes */}
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}
