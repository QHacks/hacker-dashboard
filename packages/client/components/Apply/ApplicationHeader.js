import React, { PureComponent } from "react";

class ApplicationHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        css={`
          background-color: #fafafa;
          height: 325px;
          text-align: center;
          padding-top: 155px;
          background: url(${require("../../assets/img/circuits.png")}) no-repeat
            center center fixed;
          background-size: cover;
        `}
      >
        <h1>QHacks 2019</h1>
        <h2>Hacker Application</h2>
      </div>
    );
  }
}

export default ApplicationHeader;
