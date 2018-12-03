import React from "react";
import DashboardMenu from "./DashboardMenu";
import Events from "./DashboardSection/Events";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import circuits from "../../assets/img/circuits.png";

const Dashboard = () => (
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
      <Events />
    </ContentWrapper>
  </div>
);

export default Dashboard;
