import React from "react";
import { offWhite } from "../../../assets/colors";

const DashboardSection = ({ title, children, half }) => (
  <div
    css={`
      border: 1px solid #a4b3bf;
      border-radius: 8px;
      overflow: hidden;
      margin: 1rem;
      box-shadow: 0px 2px 16px rgba(212, 217, 225, 0.4);
      width: ${half ? "calc(50% - 4rem)" : "calc(100% - 6rem)"};
      display: inline-block;
      position: relative;
    `}
  >
    <div
      css={`
        padding: 16px 24px;
        background-color: ${offWhite};
        border-bottom: 1px solid #a4b3bf;
        border-radius-top: 8px;
        overflow: hidden;
      `}
    >
      <h3 css="text-transform: uppercase; font-weight: 800;">{title}</h3>
    </div>
    <div
      css={`
        border-radius: 8px;
        padding: 40px 32px;
        overflow: hidden;
        background-color: white;
        height: 100%;
      `}
    >
      {children}
    </div>
  </div>
);

export default DashboardSection;
