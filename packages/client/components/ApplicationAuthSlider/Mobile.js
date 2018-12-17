import React, { Component } from "react";
import { redDark, red, steel } from "../../assets/colors";

class Mobile extends Component {
  changeSelected(index) {
    this.props.changeSelected(index);
  }

  render() {
    const items = this.props.items.map((item, i) => (
      <button
        css={`
          display: block;
          text-align: center;
          line-height: 44px;
          text-transform: uppercase;
          cursor: pointer;
          background: none;
          border: none;
          font-size: 18px;
          z-index: 3;
          transition: 0.5s ease;
          border-radius: 44px;
          width: 100%;
          margin: 12px auto;
          max-width: 300px;
          border: 1px solid ${steel};
          ${this.props.selectedItem === i
            ? `color: white; background-color: ${red};`
            : `color: #4d4d4d; &:hover { color: ${redDark}; }
          `}
        `}
        key={item}
        onClick={() => this.changeSelected(i)}
        type="button"
      >
        {item}
      </button>
    ));

    return (
      <div
        css={`
          margin-top: 35px;
        `}
      >
        {items}
        <hr
          css={`
            color: #c5c9d1;
            margin: 52px auto 10px;
          `}
        />
      </div>
    );
  }
}

export default Mobile;
