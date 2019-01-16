import React, { Component } from "react";
import { blue, blueLight } from "../../assets/colors";
import { linkExternalTrusted } from "../../assets/constants";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownShown: false
    };
  }

  render() {
    return (
      <div onMouseLeave={() => this.setState({ dropdownShown: false })}>
        <button
          css={`
            color: ${blue};
            font-weight: ${this.state.dropdownShown ? "bold" : 600};
            border: none;
          `}
          onMouseOver={() => this.setState({ dropdownShown: true })}
        >
          {this.props.title}
          {"  "}
          {this.state.dropdownShown ? "\u25B2" : "\u25BC"}
        </button>
        {this.state.dropdownShown ? (
          <div
            css={`
              background-color: white;
              border-top: 2px solid ${blue};
              padding: 8px 0;
              border-radius: 0 0 6px 6px;
              box-shadow: 0 4px 12px 0 rgba(167, 176, 194, 0.4);
              > a {
                display: block;
                line-height 1;
                padding: 12px !important;
                margin: 0;
                border-bottom: none !important;
                &:hover {
                  color: ${blueLight};
                }
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

export default Dropdown;
