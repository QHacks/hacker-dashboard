import React from "react";
import { mobileMaxWidth, desktopMinWidth } from "../../assets/constants";

export default ({ children }) => (
  <div
    css={`
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 80px;
      height: 100%;
      @media (max-width: 1200px) and (min-width: ${desktopMinWidth}) {
        padding-left: 80px;
        padding-right: 80px;
      }
      @media (max-width: ${mobileMaxWidth}) {
        padding-left: 5vw;
        padding-right: 5vw;
      }
    `}
  >
    {children}
  </div>
);
