import React, { Component } from "react";
import * as colors from "../../assets/colors";
import ActionButton from "../ActionButton/ActionButton";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

class MenuBar extends Component {
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
          <nav
            css={`
              display: inline-block;
              float: right;
              line-height: 44px;
              a {
                padding: 0 20px;
                color: ${colors.blue};
                font-weight: 600;
                text-decoration: none;
              }
            `}
          >
            <a href="https://qhacks.io" rel="external noopener" target="_blank">
              QHacks 2019
            </a>
            <a href="#">Past Events</a>
            <a href="#">Blog</a>
            <a href="#">Code</a>
            <ActionButton type="rounded" internal link="/apply">
              Apply
            </ActionButton>
          </nav>
        </ContentWrapper>
      </header>
    );
  }
}

export default MenuBar;
