import React from "react";
import circuits from "../../../assets/img/circuits.png";
import { steel } from "../../../assets/colors";
import { boxShadow } from "../../../assets/constants";

const Card = ({ image, title, children }) => (
  <div
    css={`
      border: 1px solid ${steel};
      border-radius: 8px;
      max-width: 285px;
      :hover {
        box-shadow: ${boxShadow};
      }
      transition: 0.25s ease;
    `}
  >
    <div
      css={`
        height: 80px;
        background: url(${image || circuits}) no-repeat center center;
        background-size: cover;
      `}
    />
    <div
      css={`
        padding: 16px;
        border-top: 1px solid ${steel};
      `}
    >
      <h3
        css="
          margin-bottom: 8px;
        "
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  </div>
);

export default Card;
