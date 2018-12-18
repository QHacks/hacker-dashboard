import { Switch } from "react-router-dom";
import React from "react";
import "normalize.css";

import ForgotPassword from "../Landing/ForgotPassword";
import UpdatePassword from "../Landing/UpdatePassword";
import { boxShadow } from "../../assets/constants";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../utils/NotFound";
import Login from "../Landing/Login";
import Route from "../utils/Route";
import Apply from "../Apply";
import {
  blue,
  steel,
  offWhite,
  linkVisited,
  linkUnvisited
} from "../../assets/colors";

const globalStyles = `
* {
  font-family: "Encode Sans", sans-serif !important;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  font-weight: 600;
  color:${linkUnvisited};
  :hover {
    text-decoration: underline;
  }
  :visited {
    color:${linkVisited};
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
  color: ${blue};
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

button:focus, input:focus {
  outline: none;
}

input:not([type="checkbox"]):not([type="image"]) {
  height: 42.4px;
  border: 1px solid ${steel};
  border-radius: 4px;
  margin: 6px 0;
  :last-child {
    margin-right: 0;
  }
  :focus {
    box-shadow: ${boxShadow};
    background-color: white;
  }
  padding: 0 6px;
  line-height: 42px;
  width: calc(100% - 12px);
  background-color: ${offWhite};
}

input:not([type="checkbox"]):not([type="image"]):only-of-type {
  width: 100%;
  margin: 6px 0;
}

div.select > div {
  border: 1px solid ${steel};
  background-color: ${offWhite};
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
  border: 1px solid ${steel};
  background-color: ${offWhite};
  border-radius: 4px;
  line-height: 1.43;
  margin: 6px 0;
  padding: 6px;
  width: 100%;
  min-height: 200px;
  resize: vertical;
  :focus {
    box-shadow: ${boxShadow};
    background-color: white;
  }
}
`;

const App = () => (
  <div css={globalStyles}>
    <Switch>
      {/* Wildcard routes */}
      <Route path="/qhacks-2019/apply" component={Apply} />

      {/* Public routes */}
      <Route path="/login" component={Login} type="public" />
      <Route path="/forgot-password" component={ForgotPassword} type="public" />
      <Route
        path="/update-password/:resetHash"
        component={UpdatePassword}
        type="public"
      />

      {/* Authenticated routes */}
      <Route path="/profile" component={Dashboard} type="private" />

      {/* Catch all routes */}
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default App;
