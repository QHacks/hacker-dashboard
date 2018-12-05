import { Redirect } from "react-router-dom";
import React from "react";

export default (props) => (
  <Redirect
    to={{
      pathname: "/profile",
      state: {
        from: props.location,
        alert: {
          type: "info",
          message: "We couldn't find the page you were looking for.",
          status: "Oops!"
        }
      }
    }}
  />
);
