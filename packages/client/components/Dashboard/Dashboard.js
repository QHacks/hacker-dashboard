import React, { Component } from "react";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import StatusReport from "../StatusReport/StatusReport";
import circuits from "../../assets/img/circuits.png";
import Events from "./DashboardSection/Events";
import DashboardMenu from "./DashboardMenu";

class Dashboard extends Component {
  renderStatusReports() {
    if (this.props.location.state) {
      const { alert } = this.props.location.state;

      if (alert) {
        return <StatusReport {...alert} />;
      }
    }
  }

  render() {
    return (
      <div
        css={`
          margin-top: 84px;
          background: url(${circuits}) no-repeat center bottom;
          background-size: cover;
          padding: 40px 0;
          height: calc(100vh - 84px);
        `}
      >
        <DashboardMenu />
        <ContentWrapper>
          {this.renderStatusReports()}
          <Events />
        </ContentWrapper>
      </div>
    );
  }
}

export default Dashboard;
