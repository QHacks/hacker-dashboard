import React, { Component } from "react";
import { offWhite } from "../../assets/colors";

class ApplicationHeader extends Component {
  render() {
    return (
      <div
        css={`
          background-color: ${offWhite};
          height: 325px;
          text-align: center;
          padding-top: 155px;
          background: url(${require("../../assets/img/circuits.png")}) no-repeat
            center center;
          background-size: cover;
          text-transform: uppercase;
        `}
      >
        <h1>QHacks 2019</h1>
        <h2>Hacker Application</h2>
      </div>
    );
  }
}

export default ApplicationHeader;
