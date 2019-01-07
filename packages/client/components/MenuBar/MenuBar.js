import React from "react";
import MediaQuery from "react-responsive";
import { mobileMaxWidth, desktopMinWidth } from "../../assets/constants";
import DesktopMenuBar from "./DesktopMenuBar";
import MobileMenuBar from "./MobileMenuBar";

const MenuBar = (props) => {
  return (
    <>
      <MediaQuery maxWidth={mobileMaxWidth}>
        <MobileMenuBar {...props} />
      </MediaQuery>
      <MediaQuery minWidth={desktopMinWidth}>
        <DesktopMenuBar {...props} />
      </MediaQuery>
    </>
  );
};

export default MenuBar;
