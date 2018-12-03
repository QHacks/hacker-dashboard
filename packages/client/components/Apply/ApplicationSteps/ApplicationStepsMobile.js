import React, { PureComponent } from "react";
import { red, steel } from "../../../assets/colors";
import check from "../../../assets/img/red-circle-check.png";

class ApplicationStepsMobile extends PureComponent {
  getBackgroundColor(num) {
    if (num > this.props.stepNum) {
      return steel;
    }
    return red;
  }

  render() {
    const pages = ["Introduction", "About You", "Why QHacks?", "Next Steps"];
    return (
      <div
        css="
          width: 100%;
          max-width: 350px;
          margin: -45px auto 0;
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        "
      >
        {pages.map((text, i) => (
          <div
            css={`
              display: flex;
              flex-grow: ${i !== pages.length - 1 ? 1 : 0};
            `}
            key={text}
          >
            <div
              css={`
                border-radius: 50%;
                height: 30px;
                width: 30px;
                line-height: 30px;
                text-align: center;
                color: white;
                background-color: ${this.props.stepNum > i
                  ? "white"
                  : this.getBackgroundColor(i)};
                display: inline-block;
              `}
            >
              {this.props.stepNum > i ? (
                <img
                  css="
                    width: 30px;
                    height: 30px;
                    margin: 0;
                  "
                  alt={`Step ${i + 1} completed`}
                  src={check}
                />
              ) : (
                i + 1
              )}
            </div>
            {i !== pages.length - 1 ? (
              <div
                role="presentation none"
                css={`
                  display: inline-block;
                  height: 50%;
                  border-bottom: 2px solid ${this.getBackgroundColor(i + 1)};
                  flex-grow: 1;
                  vertical-align: top;
                  margin: 0 4px;
                `}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default ApplicationStepsMobile;
