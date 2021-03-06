import React from "react";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";
import { linkExternalTrusted } from "../../assets/constants";
import ActionButton from "../ActionButton/ActionButton";
import { blue } from "../../assets/colors";
import DropdownMenu from "../DropdownMenu/DesktopDropdownMenu";

const Desktop = ({ hideItems, showLogin }) => (
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
      <div css="display: inline-block;">
        <img src={crown} alt="QHacks logo" />
      </div>
      <ul
        css={`
          font-size: 14px;
          display: ${hideItems ? "none" : "float"};
          float: right;
          width: ${showLogin ? "590px" : "490px"};
          justify-content: space-between;
          line-height: 44px;
          list-style-type: none;
          a:not(.actionButton),
          button:not(.actionButton) {
            cursor: pointer;
            background: none;
            color: ${blue};
            text-transform: uppercase;
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
          <DropdownMenu
            title="Past Events"
            links={[
              {
                href: "https://2018.qhacks.io",
                text: "QHacks 2018"
              },
              {
                href: "https://2017.qhacks.io",
                text: "QHacks 2017"
              },
              {
                href: "https://2016.qhacks.io",
                text: "QHacks 2016"
              }
            ]}
          />
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
          {showLogin ? (
            <ActionButton
              style="font-size: 16px;"
              type="rounded"
              internal
              inline
              link="/login"
            >
              Dashboard Login
            </ActionButton>
          ) : (
            <ActionButton
              style="font-size: 16px;"
              type="rounded"
              internal
              inline
              link="/qhacks-2019/apply"
            >
              Apply
            </ActionButton>
          )}
        </li>
      </ul>
    </ContentWrapper>
  </header>
);

export default Desktop;
