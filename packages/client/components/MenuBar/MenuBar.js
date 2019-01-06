import React, { Fragment } from "react";
import MediaQuery from "react-responsive";
import { mobileMaxWidth, desktopMinWidth } from "../../assets/constants";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const MenuBar = (props) => {
  return (
    <Fragment>
      <MediaQuery maxWidth={mobileMaxWidth}>
        <Mobile {...props} />
      </MediaQuery>
      <MediaQuery minWidth={desktopMinWidth}>
        <Desktop {...props} />
      </MediaQuery>
    </Fragment>
  );
};

export default MenuBar;
