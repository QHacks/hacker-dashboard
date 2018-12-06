import React from "react";
import { offWhite } from "../../../assets/colors";

const DashboardSection = ({ title, children }) => (
  <div
    css={`
      border: 1px solid #a4b3bf;
      border-radius: 8px;
      overflow: hidden;
      margin: 0 auto;
      box-shadow: 0 4px 6px rgba(10, 10, 10, 0.1),
        0 4px 6px rgba(10, 10, 10, 0.15);
    `}
  >
    <div
      css={`
        padding: 16px 24px;
        height: 56px;
        background-color: ${offWhite};
        border-bottom: 1px solid #a4b3bf;
        border-radius-top: 8px;
        overflow: hidden;
      `}
    >
      <h3>{title}</h3>
    </div>
    <div
      css="
        border-radius: 8px;
        padding: 40px 32px;
        overflow: hidden;
        background-color: white;
      "
    >
      {children}
    </div>
  </div>
);

export default DashboardSection;
