import React from "react";
import { offWhite, steel } from "../../assets/colors";
import circuits from "../../assets/img/circuits.png";
import { mobileMaxWidth } from "../../assets/constants";

const ApplicationHeader = () => (
  <div
    css={`
      background-color: ${offWhite};
      height: 325px;
      text-align: center;
      padding-top: 155px;
      background: url(${circuits}) no-repeat center center;
      background-size: cover;
      text-transform: uppercase;
      @media (max-width: ${mobileMaxWidth}) {
        height: 380px;
        border-bottom: 1px solid ${steel};
      }
    `}
  >
    <h1>QHacks 2019</h1>
    <h2>Hacker Application</h2>
  </div>
);

export default ApplicationHeader;
