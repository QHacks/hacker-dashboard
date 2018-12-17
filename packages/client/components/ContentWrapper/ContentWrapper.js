import React from "react";
import { mobileBreakpoint } from "../../assets/constants";

export default ({ children }) => (
  <div
    css={`
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 80px;
      height: 100%;
      @media screen and (max-width: 1200px) and (min-width: ${mobileBreakpoint}) {
        padding-left: 80px;
        padding-right: 80px;
      }
      @media screen and (max-width: ${mobileBreakpoint}) {
        padding-left: 5vw;
        padding-right: 5vw;
      }
    `}
  >
    {children}
  </div>
);
