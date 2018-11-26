import React, { PureComponent } from "react";
import { css } from "emotion";

class ApplicationAuthSlider extends PureComponent {
  changeSelected(index) {
    this.props.changeSelected(index);
  }

  render() {
    const sliderWidth = Math.trunc(100000 / this.props.items.length) / 1000;

    const sliderCss = css({
      position: "absolute",
      left: `${this.props.selectedItem * sliderWidth}%`,
      top: 0,
      height: "44px",
      backgroundColor: "#C81C2E",
      borderRadius: "44px",
      width: `${sliderWidth}%`,
      zIndex: 2,
      transition: "left 0.8s ease"
    });

    const navBarCss = css({
      display: "grid",
      gridTemplateColumns: `repeat(${this.props.items.length}, 1fr)`,
      width: "66%",
      "@media screen and (max-width: 760px)": { width: "100%" },
      maxWidth: "600px",
      margin: "20px auto 35px auto",
      backgroundColor: "#F6F6F6",
      height: "44px",
      position: "relative",
      zIndex: 2,
      border: "1px solid #e4e4e4",
      borderRadius: "44px",
      "> button.item": {
        textAlign: "center",
        lineHeight: "44px",
        textTransform: "uppercase",
        cursor: "pointer",
        background: "none",
        border: "none",
        fontSize: "18px",
        zIndex: 3,
        transition: "color 1s ease"
      },
      "> button.item.selectedItem": {
        color: "white"
      },
      "> button.item:not(.selectedItem)": {
        color: "#4d4d4d"
      },
      "> button.item:not(.selectedItem):hover": {
        color: "#C81C2E"
      }
    });

    const items = this.props.items.map((item, i) => (
      <button
        key={item}
        onClick={() => this.changeSelected(i)}
        className={this.props.selectedItem === i ? "selectedItem item" : "item"}
      >
        {item}
      </button>
    ));

    return (
      <div className={navBarCss}>
        {items}
        <div role="none presentation" className={sliderCss} />
      </div>
    );
  }
}

export default ApplicationAuthSlider;
