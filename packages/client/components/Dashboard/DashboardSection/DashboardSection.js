import React from "react";
import { steel } from "../../../assets/colors";

const DashboardSection = ({ title, children, half }) => (
  <div
    css={`
      border: 1px solid ${steel};
      border-radius: 8px;
      margin: 1rem;
      box-shadow: 0px 2px 16px rgba(212, 217, 225, 0.4);
      width: ${half ? "calc(50% - 4rem)" : "calc(100% - 6rem)"};
      min-height: 365px;
      overflow: hidden;
      display: inline-block;
      background-color: white;
    `}
  >
    <div
      css={`
        padding: 0 24px;
        height: 52px;
        line-height: 52px;
        border-bottom: 1px solid ${steel};
        border-radius-top: 8px;
        overflow: hidden;
      `}
    >
      <h3 css="font-weight: 600;">{title}</h3>
    </div>
    <div
      css={`
        border-radius: 8px;
        padding: 40px 32px;
        overflow: hidden;
        min-height: 313px;
      `}
    >
      {children}
    </div>
  </div>
);

export default DashboardSection;
