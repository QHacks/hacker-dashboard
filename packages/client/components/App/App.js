import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import UpdatePassword from "../UpdatePassword";
import ResetPassword from "../ResetPassword";
import React, { Component } from "react";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Apply from "../Apply";

export default class App extends Component {
  render() {
    return (
      <div>
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
