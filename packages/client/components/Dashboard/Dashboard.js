import React, { Component } from "react";
import DashboardMenu from "./DashboardMenu";
import Events from "./DashboardSection/Events";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

class Dashboard extends Component {
  render() {
    return (
      <div
        css={`
          margin-top: 84px;
          background: url(${require("../../assets/img/circuits.png")}) no-repeat
            center bottom;
          background-size: cover;
          padding: 40px 0;
          height: calc(100vh - 84px);
        `}
      >
        <DashboardMenu />
        <ContentWrapper>
          <Events />
        </ContentWrapper>
      </div>
    );
  }
}

export default Dashboard;
