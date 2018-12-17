import React, { Component } from "react";

import {
  orange,
  orangeWhite,
  red,
  redWhite,
  green,
  greenWhite,
  cyan,
  cyanWhite
} from "../../assets/colors";

class Alert extends Component {
  getBorderColor() {
    switch (this.props.type.toLowerCase()) {
      case "caution": {
        return orange;
      }
      case "danger": {
        return red;
      }
      case "success": {
        return green;
      }
      default: {
        return cyan;
      }
    }
  }

  getBackgroundColor() {
    switch (this.props.type.toLowerCase()) {
      case "caution": {
        return orangeWhite;
      }
      case "danger": {
        return redWhite;
      }
      case "success": {
        return greenWhite;
      }
      default: {
        return cyanWhite;
      }
    }
  }

  getIcon() {
    switch (this.props.type.toLowerCase()) {
      case "caution": {
        return "../../assets/img/caution.svg";
      }
      case "danger": {
        return "../../assets/img/danger.svg";
      }
      case "success": {
        return "../../assets/img/success.svg";
      }
      default: {
        return "../../assets/img/info.svg";
      }
    }
  }

  getStatus() {
    if (this.props.status === "none") return "";
    if (this.props.status) return this.props.status;

    switch (this.props.type.toLowerCase()) {
      case "caution": {
        return "Caution:";
      }
      case "danger": {
        return "Error:";
      }
      case "success": {
        return "Success:";
      }
      default: {
        return "Helpful Tip:";
      }
    }
  }

  render() {
    return (
      <div
        css={`
          border: 1px solid ${this.getBorderColor()};
          border-radius: 6px;
          background-color: ${this.getBackgroundColor()};
          padding: 12px 12px 6px 12px;
          line-height: 24px;
          width: 100%;
          text-align: left;
          display: flex;
          > * {
            vertical-align: middle;
          }
        `}
      >
        <div
          css={`
            max-width: 24px;
            padding-right: 12px;
            box-sizing: content-box;
          `}
        >
          <img
            src={this.getIcon()}
            alt={this.getStatus()}
            css="
              height: 24px;
              width: 24px;
            "
          />
        </div>
        <div>
          <strong
            css="
              margin-right: 6px;
            "
          >
            {this.getStatus()}
          </strong>
          <span>{this.props.message}</span>
        </div>
      </div>
    );
  }
}

export default Alert;
