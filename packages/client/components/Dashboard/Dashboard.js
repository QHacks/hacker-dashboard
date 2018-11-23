import { Route } from "react-router-dom";
import React, { Component } from "react";
import { isEmpty } from "lodash";

import { Landing as AdminLanding } from "../Admin";
import { Landing as HackerLanding } from "../Hacker";
import PrivateRoute from "../utils/PrivateRoute";
import { AuthSwitch, NotFound } from "../utils";
import Profile from "../Profile";
import MenuBar from "../MenuBar";

class Dashboard extends Component {
  handleLogoutClick() {
    // invalidate access token and redirect to login page
  }

  renderMenuBar() {
    const isAdmin = false;

    return (
      <MenuBar
        onLogoutClick={this.handleLogoutClick.bind(this)}
        isAdmin={isAdmin}
      />
    );
  }

  renderBody() {
    // get the user role based on scopes and auth info
    const isHacker = true;
    const isAdmin = false;
    const isPartner = false;

    const authType =
      (isAdmin && "admin") ||
      (isPartner && "partner") ||
      (isHacker && "hacker");

    return (
      <AuthSwitch type={authType}>
        <PrivateRoute
          exact
          path="/"
          types={["admin"]}
          component={AdminLanding}
        />
        <PrivateRoute
          exact
          path="/profile"
          types={["hacker", "partner", "admin"]}
          component={Profile}
        />
        <PrivateRoute
          exact
          path="/"
          types={["hacker"]}
          component={HackerLanding}
        />
        <Route path="*" component={NotFound} />
      </AuthSwitch>
    );
  }

  renderDashboardSuccessMessages() {
    const successMessages = [];

    if (isEmpty(successMessages)) {
      return [];
    }

    return successMessages.map((message, index) => <p>{message}</p>);
  }

  renderDashboardErrorMessages() {
    const errorMessages = [];

    if (isEmpty(errorMessages)) {
      return [];
    }

    return errorMessages.map((message, index) => <p>{message}</p>);
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        {this.renderMenuBar()}
        {this.renderDashboardSuccessMessages()}
        {this.renderDashboardErrorMessages()}
        {this.renderBody()}
      </div>
    );
  }
}

export default Dashboard;
