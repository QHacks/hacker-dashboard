import React, { Component } from "react";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import blueCircuits from "../../assets/img/blue-circuits.png";
import Events from "./DashboardSection/Events";
import DashboardMenu from "./DashboardMenu";
import Alert from "../Alert/Alert";

class Dashboard extends Component {
  renderAlerts() {
    if (this.props.location.state) {
      const { alert } = this.props.location.state;

      if (alert) {
        return <Alert {...alert} />;
      }
    }
  }

  render() {
    return (
      <div
        css={`
          margin-top: 84px;
          background: url(${blueCircuits}) no-repeat center bottom;
          background-size: cover;
          padding: 30px 0;
          height: calc(100vh - 84px);
        `}
      >
        <DashboardMenu />
        <ContentWrapper>
          <div
            css="
            margin-bottom: 30px;
          "
          >
            {this.renderAlerts()}
          </div>
          <Events />
        </ContentWrapper>
      </div>
    );
  }
}

export default Dashboard;
