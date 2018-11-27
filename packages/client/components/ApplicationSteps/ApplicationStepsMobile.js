import React, { PureComponent } from "react";
import * as colors from "../../assets/colors";

class ApplicationStepsMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getBackgroundColor(num) {
    if (num > this.props.pageNum) {
      return "#d2d2d2";
    }
    return colors.red;
  }
  render() {
    const pages = ["Introduction", "About You", "Why QHacks?", "Next Steps"];
    return (
      <div
        css={`
          width: 100%;
          max-width: 350px;
          margin: -45px auto 0;
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        `}
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
                background-color: ${this.getBackgroundColor(i)};
                display: inline-block;
              `}
            >
              {this.props.pageNum > i ? "\u2713" : i + 1}
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
