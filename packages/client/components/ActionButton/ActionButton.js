import { Link } from "react-router-dom";
import React from "react";

import {
  red,
  blue,
  redLight,
  blueLight,
  redDark,
  blueDark,
  steel,
  offWhite
} from "../../assets/colors";
import { boxShadow, subtleBoxShadow } from "../../assets/constants";

const ActionButton = (props) => {
  const roundPadding = props.inline ? "24px" : "55px";

  const roundedStyles = `
    border-radius: 28px;
    padding: 0 ${roundPadding};
  `;

  const rectStyles = `
    border-radius: 4px;
    border: none;
    padding: 0 25px;
  `;

  const getColor = () => (props.color && props.color.toLowerCase()) || "white";

  const getBackgroundColor = () => {
    if (props.inline && !props.color) {
      return "transparent";
    }

    switch (getColor()) {
      case "red":
        return red;
      case "blue":
        return blue;
      default:
        return "white";
    }
  };

  const getForegroundColor = () => {
    switch (getColor()) {
      case "red":
        return "white";
      case "blue":
        return "white";
      default:
        return props.foregroundColor || blue;
    }
  };

  const getDisabledForegroundColor = () => {
    switch (getColor()) {
      case "red":
        return "#9b9b9b";
      case "blue":
        return "#9b9b9b";
      default:
        return getForegroundColor();
    }
  };

  const getHoverBackgroundColor = () => {
    if (props.inline && !getColor()) {
      return "transparent";
    }

    switch (getColor()) {
      case "red":
        return redLight;
      case "blue":
        return blueLight;
      default:
        return "white";
    }
  };

  const getDisabledBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return offWhite;
      case "blue":
        return offWhite;
      default:
        return "white";
    }
  };

  const getBorder = () => {
    switch (getColor()) {
      case "red":
        return "none";
      case "blue":
        return "none";
      default:
        return props.inline ? `2px solid ${blue}` : "1px solid #999da4";
    }
  };

  const getHoverBorder = () => {
    switch (getColor()) {
      case "red":
        return "none";
      case "blue":
        return "none";
      default:
        return props.inline
          ? `2px solid ${getForegroundColor()}`
          : `1px solid ${getForegroundColor()}`;
    }
  };

  const getDisabledBorder = () => {
    switch (getColor()) {
      case "red":
        return `1px solid ${steel}`;
      case "blue":
        return `1px solid ${steel}`;
      default:
        return props.inline ? `2px solid ${blue}` : `1px solid ${blue}`;
    }
  };

  const getClickBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return redDark;
      case "blue":
        return blueDark;
      default:
        return "white";
    }
  };

  const height = props.inline ? "32px" : "42px";

  let commonStyles = `
    box-sizing: content-box;
    height: ${height};
    cursor: pointer;
    width: props.width;
    flex-direction:column;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: ${props.inline ? "16px" : "18px"};
    color: ${getForegroundColor()} !important;
    background-color: ${getBackgroundColor()};
    border: ${getBorder()};
    box-shadow: ${subtleBoxShadow};
    :hover {
      background-color: ${getHoverBackgroundColor()};
      border: ${getHoverBorder()};
      box-shadow: ${boxShadow};
    }
    :active {
      background-color: ${getClickBackgroundColor()};
      border: ${getHoverBorder()};
    }
    :disabled {
      background-color: ${getDisabledBackgroundColor()};
      border: ${getDisabledBorder()};
      color: ${getDisabledForegroundColor()} !important;
      box-shadow: none;
      cursor: default;
    }
    transition: 0.25s ease;
    font-weight: 600;
  `;

  switch (props.type) {
    case "rounded":
      commonStyles = `
      ${roundedStyles}
      ${commonStyles}
      ${props.style || ""}
      `;
      break;
    default:
      commonStyles = `
      ${rectStyles}
      ${commonStyles}
      ${props.style || ""}
      `;
      break;
  }

  return props.link ? (
    <Link
      css={`
        ${commonStyles} display: inline-block;
        boxsizing: content-box;
        text-decoration: none !important;
      `}
      disabled={props.disabled}
      onClick={props.onClick}
      to={props.link}
      rel={props.internal ? null : "nofollow noopener"}
      target={props.internal ? null : "_blank"}
      className={props.className || "actionButton"}
    >
      <div
        css={`
          height: ${height};
          line-height: ${height};
        `}
      >
        {props.children}
      </div>
    </Link>
  ) : (
    <button
      css={commonStyles}
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className || "actionButton"}
      type="button"
    >
      <div
        css={`
          height: ${height};
          line-height: ${height};
        `}
      >
        {props.children}
      </div>
    </button>
  );
};

export default ActionButton;
