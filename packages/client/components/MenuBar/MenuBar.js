import React from "react";
import { blue } from "../../assets/colors";
import { linkExternalTrusted } from "../../assets/constants";
import ActionButton from "../ActionButton/ActionButton";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

const MenuBar = (props) => (
  <header
    css="
      width: 100%;
      height: 84px;
      line-height: 44px;
      padding: 20px 0;
      position: absolute;
      top: 0;
      left: 0;
    "
  >
    <ContentWrapper wide={props.wide}>
      <div
        css="
          display: inline-block;
        "
      >
        <img src={crown} alt="QHacks logo" />
      </div>
      <ul
        css={`
          font-size: 14px;
          display: ${props.hideItems ? "none" : "float"};
          float: right;
          width: 490px;
          justify-content: space-between;
          line-height: 44px;
          text-transform: uppercase;
          list-style-type: none;
          a:not(.actionButton) {
            color: ${blue};
            font-weight: 600;
            padding-bottom: 2px;
            padding-top: 2px;
            :hover {
              text-decoration: none;
              border-bottom: 2px solid ${blue};
            }
          }
          a.actionButton {
            font-size: 14px;
          }
          li {
            display: block;
          }
        `}
      >
        <li>
          <a href="https://qhacks.io" {...linkExternalTrusted}>
            QHacks 2019
          </a>
        </li>
        <li>
          <a {...linkExternalTrusted} href="https://2018.qhacks.io">
            Past Events
          </a>
        </li>
        <li>
          <a {...linkExternalTrusted} href="https://medium.com/qhacks">
            Blog
          </a>
        </li>
        <li>
          <a {...linkExternalTrusted} href="https://github.com/qhacks">
            Code
          </a>
        </li>
        <li>
          <ActionButton
            style="font-size: 16px;"
            type="rounded"
            internal
            inline
            link="/qhacks-2019/apply"
          >
            Apply
          </ActionButton>
        </li>
      </ul>
    </ContentWrapper>
  </header>
);

export default MenuBar;
