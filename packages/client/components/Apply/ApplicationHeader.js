import React from "react";
import { offWhite } from "../../assets/colors";
import circuits from "../../assets/img/circuits.png";

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
    `}
  >
    <h1>QHacks 2019</h1>
    <h2>Hacker Application</h2>
  </div>
);

export default ApplicationHeader;
