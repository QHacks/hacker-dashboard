import MediaQuery from "react-responsive";
import React, { Fragment } from "react";
import ApplicationStepsMobile from "./ApplicationStepsMobile";
import ApplicationStepsDesktop from "./ApplicationStepsDesktop";
import { mobileMaxWidth, desktopMinWidth } from "../../../assets/constants";

export default (props) => (
  <Fragment>
    <MediaQuery maxWidth={mobileMaxWidth}>
      <ApplicationStepsMobile {...props} />
    </MediaQuery>
    <MediaQuery minWidth={desktopMinWidth}>
      <ApplicationStepsDesktop {...props} />
    </MediaQuery>
  </Fragment>
);
