import React, { Component } from "react";
import { red, redDark, offWhite, steel } from "../../assets/colors";

class Desktop extends Component {
  changeSelected(index) {
    this.props.changeSelected(index);
  }

  render() {
    const sliderWidth = Math.trunc(100000 / this.props.items.length) / 1000;

    const sliderCss = `
      position: absolute;
      left: ${this.props.selectedItem * sliderWidth}%;
      top: 0;
      height: 44px;
      background-color: ${red};
      border-radius: 44px;
      width: ${sliderWidth}%;
      z-index: 2;
      transition: left 0.8s ease;
    `;

    const navBarCss = `
      display: grid;
      grid-template-columns: repeat(${this.props.items.length}, 1fr);
      width: 66%;
      max-width: 600px;
      margin: 20px auto 35px auto;
      background-color: ${offWhite};
      height: 44px;
      position: relative;
      z-index: 2;
      box-sizing: content-box;
      border: 1px solid ${steel};
      border-radius: 44px;
      button.item {
        text-align: center;
        line-height: 44px;
        text-transform: uppercase;
        cursor: pointer;
        background: none;
        border: none;
        font-size: 18px;
        z-index: 3;
        transition: color 1s ease;
      }
      button.item.selectedItem {
        color: white;
      }
      button.item:not(.selectedItem) {
        color: #4d4d4d;
      }
      button.item:not(.selectedItem):hover {
        color: ${redDark};
      }
    `;

    const items = this.props.items.map((item, i) => (
      <button
        key={item}
        onClick={() => this.changeSelected(i)}
        className={this.props.selectedItem === i ? "selectedItem item" : "item"}
        type="button"
      >
        {item}
      </button>
    ));

    return (
      <div css={navBarCss}>
        {items}
        <div role="none presentation" css={sliderCss} />
      </div>
    );
  }
}

export default Desktop;
