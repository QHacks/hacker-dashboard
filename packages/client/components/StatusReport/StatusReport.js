import React, { Component } from "react";
import * as colors from "../../assets/colors";

class StatusReport extends Component {
  getBorderColor() {
    switch (this.props.type.toLowerCase()) {
      case "caution": {
        return colors.orange;
      }
      case "danger": {
        return colors.red;
      }
      case "success": {
        return colors.green;
      }
      default: {
        return colors.cyan;
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
    if (this.props.status) return this.props.status;
    switch (this.props.type.toLowerCase()) {
      case "caution": {
        return "Caution";
      }
      case "danger": {
        return "Error";
      }
      case "success": {
        return "Success";
      }
      default: {
        return "Helpful Tip";
      }
    }
  }

  render() {
    return (
      <div
        css={`
          border: 1px solid ${this.getBorderColor()};
          border-radius: 6px;
          background-color: white;
          padding: 12px;
          margin: 12px 0;
          line-height: 24px;
          width: 100%;
          > * {
            vertical-align: middle;
          }
        `}
      >
        <img
          src={this.getIcon()}
          css={`
            margin-right: 12px;
            height: 24px;
            width: 24px;
          `}
        />
        <strong
          css={`
            margin-right: 12px;
          `}
        >
          {this.getStatus()}:
        </strong>
        <span>{this.props.message}</span>
      </div>
    );
  }
}

export default StatusReport;
