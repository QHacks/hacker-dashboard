import React, { Component } from "react";
import { linkExternalTrusted } from "../../assets/constants";
import { offWhite, steel } from "../../assets/colors";

class Mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownShown: false
    };
  }

  render() {
    return (
      <div
        css={`
          width: 100%;
        `}
      >
        <button
          onClick={() =>
            this.setState((state) => ({ dropdownShown: !state.dropdownShown }))
          }
        >
          {this.props.title}
          {"  "}
          {this.state.dropdownShown ? "\u25B2" : "\u25BC"}
        </button>
        {this.state.dropdownShown ? (
          <div
            css={`
              background-color: ${offWhite};
              border-top: 1px solid ${steel};
              border-bottom: 1px solid ${steel};
              width: 100%;
              margin: 6px 0;
              a {
                font-weight: normal !important;
              }
            `}
          >
            {this.props.links.map((link) => (
              <a
                {...linkExternalTrusted}
                key={`${link.href}-${link.text}`}
                href={link.href}
              >
                {link.text}
              </a>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Mobile;
