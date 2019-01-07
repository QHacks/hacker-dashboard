import React from "react";
import MediaQuery from "react-responsive";
import { mobileMaxWidth, desktopMinWidth } from "../../assets/constants";
import Desktop from "./DesktopApplicationAuthSlider";
import Mobile from "./MobileApplicationAuthSlider";

const ApplicationAuthSlider = (props) => {
  return (
    <>
      <MediaQuery maxWidth={mobileMaxWidth}>
        <Mobile {...props} />
      </MediaQuery>
      <MediaQuery minWidth={desktopMinWidth}>
        <Desktop {...props} />
      </MediaQuery>
    </>
  );
};

export default ApplicationAuthSlider;
