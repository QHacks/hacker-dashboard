import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div
        css={`
          border: 1px solid #ced4da;
          border-radius: 8px;
          max-width: 285px;
        `}
      >
        <div
          css={`
            height: 80px;
            background: url(${this.props.image ||
                require("../../../assets/img/circuits.png")})
              no-repeat center center;
            background-size: cover;
          `}
        />
        <div
          css={`
            padding: 16px;
            border-top: 1px solid #ced4da;
          `}
        >
          <h3
            css={`
              margin-bottom: 8px;
            `}
          >
            {this.props.title}
          </h3>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Card;
