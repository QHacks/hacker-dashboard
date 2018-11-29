import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import React, { Component } from "react";
import Dashboard from "../Dashboard";
import Login from "../Landing/Login";
import ForgotPassword from "../Landing/ForgotPassword";
import UpdatePassword from "../Landing/UpdatePassword";
import Apply from "../Apply";
import * as constants from "../../assets/constants";
import "normalize.css";

const globalStyles = `
* {
  font-family: "Encode Sans", sans-serif !important;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  color: #020b1b;
}
a {
  text-decoration: none;
}
h1 {
  font-size: 44px;
  font-weight: 700;
  margin: 16px 0;
}
h2 {
  font-size: 24px
  font-weight: 600;
}
h3 {
  font-size: 18px
  font-weight: 600;
}

h1, h2, h3, h4 {
  color: ${constants.blue};
}
strong {
  font-weight: 600;
}
label {
  margin: 6px;
  text-align: left;
}
input:not([type="checkbox"]) {
  height: 42px;
  border: 1px solid #b2b7c2;
  border-radius: 4px;
  margin: 6px;
  padding: 0 6px;
  line-height: 42px;
  width: calc(100% - 12px);
  background-color: #f8f8f8;
}
input:not([type="checkbox"]):only-of-type {
  width: 100%;
  margin: 6px 0;
}
div.select > div {
  border: 1px solid #b2b7c2;
  background-color: #f8f8f8;
}
div.select input {
  height: unset;
  line-height: unset;
  margin: unset;
  padding: unset;
}
textarea {
  border: 1px solid #b2b7c2;
  background-color: #f8f8f8;
  border-radius: 4px;
  margin: 6px 0;
  padding: 6px;
  width: 100%;
  min-height: 200px;
}
`;

export default class App extends Component {
  render() {
    return (
      <div css={globalStyles}>
        <Switch>
          {/* Public routes */}
          <Route path="/apply" component={Apply} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/update-password/:hash" component={UpdatePassword} />

          {/* Authenticated routes */}
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}
