import React, { PureComponent } from "react";
import { red, offWhite, steel } from "../../../assets/colors";

class ApplicationStepsDesktop extends PureComponent {
  getBackgroundColor(num) {
    if (num === this.props.stepNum) {
      return red;
    }
    if (num > this.props.stepNum) {
      return "white";
    }
    return "transparent";
  }

  getForegroundColor(num) {
    if (num === this.props.stepNum) {
      return "white";
    }
    return "black";
  }

  getForegroundFontWeight(num) {
    if (num === this.props.stepNum) {
      return 600;
    }
    return 500;
  }

  getSecondaryFontWeight(num) {
    if (num === this.props.stepNum) {
      return 500;
    }
    return 600;
  }

  getIcon(num) {
    if (num < this.props.stepNum) {
      return (
        <img
          css={`
            margin-right: 16px;
            height: 32px;
            width: 32px;
          `}
          src={require("../../../assets/img/circle-check.svg")}
        />
      );
    }

    if (num === this.props.stepNum) {
      return (
        <div
          css={`
            margin-right: 16px;
            height: 32px;
            width: 32px;
            border: 2px solid white;
            border-radius: 50%;
          `}
        />
      );
    }

    return (
      <div
        css={`
          margin-right: 16px;
          height: 32px;
          width: 32px;
          border: 2px solid ${steel};
          border-radius: 50%;
        `}
      />
    );
  }

  getComplementColor(num) {
    if (num === this.props.stepNum) {
      return "white";
    }
    return red;
  }

  render() {
    const pages = ["Introduction", "About You", "Why QHacks?", "Next Steps"];
    return (
      <div
        css={`
          background-color: ${offWhite};
          width: 100%;
          height: 80px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          border-top: 1px solid ${steel};
          border-bottom: 1px solid ${steel};
        `}
      >
        {pages.map((text, i) => (
          <div
            key={text}
            css={`
              display: flex;
              width: 200px;
              padding: 20px;
              color: ${this.getForegroundColor(i)};
              background-color: ${this.getBackgroundColor(i)};
              border-left: 1px solid ${steel};
              align-items: center;
              :last-child {
                border-right: 1px solid ${steel};
              }
            `}
          >
            {this.getIcon(i)}
            <div>
              <div
                css={`
                  font-size: 12px;
                  font-weight: ${this.getSecondaryFontWeight(i)};
                  padding-bottom: 3px;
                  color: ${this.getComplementColor(i)};
                  text-transform: uppercase;
                `}
              >
                Step {i + 1}
              </div>
              <div
                css={`
                  font-weight: ${this.getForegroundFontWeight(i)};
                  color: ${this.getForegroundColor(i)};
                `}
              >
                {text}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ApplicationStepsDesktop;
