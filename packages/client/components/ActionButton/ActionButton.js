import React from "react";
import * as colors from "../../assets/colors";

const ActionButton = (props) => {
  const roundedStyles = `
    border-radius: 28px;
    border: solid 2px ${props.foregroundColor || colors.blue};
    padding-left: 55px;
    padding-right: 55px;
    `;

  const rectStyles = `
    border-radius: 4px;
    border: none;
    padding-left: 25px;
    padding-right: 25px;
  `;

  const getColor = () => {
    return (props.color && props.color.toLowerCase()) || "white";
  };

  const getBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return colors.red;
      case "blue":
        return colors.blue;
      default:
        return "white";
    }
  };
  const getForgroundColor = () => {
    switch (getColor()) {
      case "red":
        return "white";
      case "blue":
        return "white";
      default:
        return colors.blue;
    }
  };
  const getHoverBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return colors.redLight;
      case "blue":
        return colors.blueLight;
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
        return "1px solid #999da4";
    }
  };
  const getHoverBorder = () => {
    switch (getColor()) {
      case "red":
        return "none";
      case "blue":
        return "none";
      default:
        return `1px solid ${colors.blue}`;
    }
  };
  const getClickBackgroundColor = () => {
    switch (getColor()) {
      case "red":
        return colors.redDark;
      case "blue":
        return colors.blueDark;
      default:
        return "white";
    }
  };
  let commonStyles = `
    min-height: 48px;
    cursor: pointer;
    line-height: 48px;
    width: props.width;
    text-align: center;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: ${getForgroundColor()};
    background-color: ${getBackgroundColor()};
    border: ${getBorder()};
    :hover {
      background-color: ${getHoverBackgroundColor()};
      border: ${getHoverBorder()};
    }
    :active {
      background-color: ${getClickBackgroundColor()};
      border: ${getHoverBorder()};
    }
    transition: 0.25s ease;
    font-weight: 600;
  `;

  switch (props.type) {
    case "rounded":
      commonStyles = `
      ${roundedStyles}
      ${commonStyles}
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
        display: "inline-block";
        boxsizing: "content-box";
      `}
      data-cy={props.dataCy}
      disabled={props.disabled}
      onClick={props.onClick}
      href={props.link}
      rel={props.internal ? null : "external noopener"}
      target={props.internal ? null : "_blank"}
    >
      {props.children}
    </a>
  ) : (
    <button
      css={commonStyles}
      data-cy={props.dataCy}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ActionButton;
