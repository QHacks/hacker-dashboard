import MediaQuery from "react-responsive";
import React from "react";
import ApplicationStepsMobile from "./ApplicationStepsMobile";
import ApplicationStepsDesktop from "./ApplicationStepsDesktop";
import { mobileMaxWidth, desktopMinWidth } from "../../../assets/constants";

export default (props) => (
  <>
    <MediaQuery maxWidth={mobileMaxWidth}>
      <ApplicationStepsMobile {...props} />
    </MediaQuery>
    <MediaQuery minWidth={desktopMinWidth}>
      <ApplicationStepsDesktop {...props} />
    </MediaQuery>
  </>
);
