import MediaQuery from "react-responsive";
import React, { Fragment } from "react";
import ApplicationStepsMobile from "./ApplicationStepsMobile";
import ApplicationStepsDesktop from "./ApplicationStepsDesktop";

export default (props) => (
  <Fragment>
    <MediaQuery query="screen and (max-width: 760px)">
      <ApplicationStepsMobile {...props} />
    </MediaQuery>
    <MediaQuery query="screen and (min-width: 760px)">
      <ApplicationStepsDesktop {...props} />
    </MediaQuery>
  </Fragment>
);
