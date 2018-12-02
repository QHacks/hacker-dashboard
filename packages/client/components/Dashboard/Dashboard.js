import React, { Component } from "react";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import Events from "../DashboardSection/Events";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <DashboardMenu />
        <div
          css={`
              margin-top: 84px;
              background: url(${require("../../assets/img/landing.png")}) no-repeat center bottom;
              background-size: cover;
              height: calc(100vh - 84px);
              padding: 50px;
              width: 100%:
            `}
        >
          <Events />
        </div>
      </div>
    );
  }
}

export default Dashboard;
