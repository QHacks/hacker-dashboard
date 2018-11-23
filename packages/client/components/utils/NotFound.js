import { Redirect } from "react-router-dom";
import React from "react";

export default ({ location }) => (
  <Redirect
    to={{
      pathname: "/",
      state: {
        from: location,
        message: "Page not found!"
      }
    }}
  />
);
