import React, { Component } from "react";
import ActionButton from "../ActionButton/ActionButton";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";

class DashboardMenu extends Component {
  render() {
    return (
      <header
        css={`
          width: 100%;
          height: 84px;
          line-height: 44px;
          padding: 20px 0;
          position: absolute;
          top: 0;
          left: 0;
          border-bottom: 1px solid #a4b3bf;
        `}
      >
        <ContentWrapper>
          <div
            css={`
              display: inline-block;
            `}
          >
            <img src={crown} alt="QHacks logo" />
          </div>
          <div
            css={`
              display: inline-block;
              float: right;
              line-height: 44px;
            `}
          >
            <ActionButton
              style={`font-size: 16px;`}
              type="rounded"
              internal
              link="/logout"
            >
              Log out
            </ActionButton>
          </div>
        </ContentWrapper>
      </header>
    );
  }
}

export default DashboardMenu;
