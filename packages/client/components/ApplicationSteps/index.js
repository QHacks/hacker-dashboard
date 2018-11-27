import MediaQuery from "react-responsive";
import React from "react";
import ApplicationStepsMobile from "./ApplicationStepsMobile";
import ApplicationStepsDesktop from "./ApplicationStepsDesktop";

export default (props) => (
  <div>
    <MediaQuery query="screen and (max-width: 760px)">
      <ApplicationStepsMobile {...props} />
    </MediaQuery>
    <MediaQuery query="screen and (min-width: 760px)">
      <ApplicationStepsDesktop {...props} />
    </MediaQuery>
  </div>
);
