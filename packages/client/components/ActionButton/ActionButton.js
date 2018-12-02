import React from "react";
import * as constants from "../../assets/constants";

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

  const getColor = () => {
    return (props.color && props.color.toLowerCase()) || "white";
  };

  const getBackgroundColor = () => {
    if (props.inline && !props.color) {
      return "transparent";
    }
    switch (getColor()) {
      case "red":
        return constants.red;
      case "blue":
        return constants.blue;
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
        return props.foregroundColor || constants.blue;
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
        return constants.redLight;
      case "blue":
        return constants.blueLight;
      default:
        return "white";
    }
  };

  const getDisabledBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return "#f5f5f5";
      case "blue":
        return "#f5f5f5";
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
        return props.inline
          ? `2px solid ${constants.blue}`
          : "1px solid #999da4";
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
        return "1px solid #c4c4c4";
      case "blue":
        return "1px solid #c4c4c4";
      default:
        return props.inline
          ? `2px solid ${constants.blue}`
          : `1px solid ${constants.blue}`;
    }
  };

  const getClickBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return constants.redDark;
      case "blue":
        return constants.blueDark;
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
    :hover {
      background-color: ${getHoverBackgroundColor()};
      border: ${getHoverBorder()};
      box-shadow: ${constants.boxShadow};
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
    <a
      css={`
        ${commonStyles}
        display: inline-block;
        boxsizing: content-box;
        text-decoration: none !important;
      `}
      disabled={props.disabled}
      onClick={props.onClick}
      href={props.link}
      rel={props.internal ? null : "external noopener"}
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
    </a>
  ) : (
    <button
      css={commonStyles}
      disabled={props.disabled}
      onClick={props.onClick}
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
    </button>
  );
};

export default ActionButton;
