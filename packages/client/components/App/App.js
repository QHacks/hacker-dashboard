import { Switch } from "react-router-dom";
import React, { Component } from "react";
import "normalize.css";

import ForgotPassword from "../Landing/ForgotPassword";
import UpdatePassword from "../Landing/UpdatePassword";
import * as constants from "../../assets/constants";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Landing/Login";
import Route from "../utils/Route";
import Apply from "../Apply";

const globalStyles = `
color: #020b1b;

* {
  font-family: "Encode Sans", sans-serif !important;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color:${constants.linkUnvisited};
  :hover {
    text-decoration: underline;
  }
  :visited {
    color:${constants.linkVisited};
  }
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
  font-size: 14px;
  margin: 6px 0;
  text-align: left;
  color: #838a99;
  font-weight: 600;
  text-transform: uppercase;
}

input:not([type="checkbox"]) {
  height: 42.4px;
  border: 1px solid #b2b7c2;
  border-radius: 4px;
  margin: 6px 0;
  :last-child {
    margin-right: 0;
  }
  :focus {
    box-shadow: ${constants.boxShadow};
    background-color: white;
  }
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
  box-shadow: none !important;
  background-color: unset !important;
}

textarea {
  border: 1px solid #b2b7c2;
  background-color: #f8f8f8;
  border-radius: 4px;
  margin: 6px 0;
  padding: 6px;
  width: 100%;
  min-height: 200px;
  :focus {
    box-shadow: ${constants.boxShadow};
    background-color: white;
  }
}
`;

export default class App extends Component {
  render() {
    return (
      <div css={globalStyles}>
        <Switch>
          {/* Wildcard routes */}
          <Route path="/qhacks-2019/apply" component={Apply} />

          {/* Public routes */}
          <Route path="/login" component={Login} type="public" />
          <Route
            path="/forgot-password"
            component={ForgotPassword}
            type="public"
          />
          <Route
            path="/update-password/:resetHash"
            component={UpdatePassword}
            type="public"
          />

          {/* Authenticated routes */}
          <Route path="/profile" component={Dashboard} type="private" />
        </Switch>
      </div>
    );
  }
}
