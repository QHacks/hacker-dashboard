import React, { Fragment } from "react";
import MediaQuery from "react-responsive";
import { mobileBreakpoint } from "../../assets/constants";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const ApplicationAuthSlider = (props) => {
  return (
    <Fragment>
      <MediaQuery query={`(max-width: ${mobileBreakpoint})`}>
        <Mobile {...props} />
      </MediaQuery>
      <MediaQuery query={`(min-width: ${mobileBreakpoint})`}>
        <Desktop {...props} />
      </MediaQuery>
    </Fragment>
  );
};

export default ApplicationAuthSlider;
