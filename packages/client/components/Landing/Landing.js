import React from "react";
import { mobileMaxWidth, desktopMinWidth } from "../../assets/constants";
import { decorativeElement } from "../../assets/constants";
import circuits from "../../assets/img/circuits.png";
import { grey, steel } from "../../assets/colors";
import MenuBar from "../MenuBar/MenuBar";

const Landing = ({ children }) => (
  <div>
    <MenuBar />
    <div
      css={`
        display: grid;
        height: 100vh;
        margin: 0;
        padding: 0;
        @media screen and (min-width: 2500px) {
          grid-template-columns: 50% 50%;
        }
        @media screen and (max-width: ${mobileMaxWidth}) {
          grid-template-columns: 100%;
          > div:last-child {
            display: none;
          }
        }
        grid-template-columns: minmax(500px, 40%) auto;
      `}
    >
      <div
        css={`
          height: 100%;
          padding: 170px 64px 100px calc(50vw - 615px);
          @media screen and (max-width: 1400px) and (min-width: ${desktopMinWidth}) {
            padding-left: 80px;
          }
          @media screen and (max-width: ${mobileMaxWidth}) {
            padding-left: 5vw;
            background: url(${circuits}) no-repeat center center;
            background-size: cover;
          }
          > input {
            margin: 12px 4px !important;
            display: block;
            max-width: 375px;
          }
          p.blurb {
            max-width: 300px;
            font-size: 18px;
          }
          a.landingLink {
            font-weight: 600;
            color: ${grey};
            text-decoration: underline;
          }
        `}
      >
        {children}
      </div>
      <div
        css={`
          background: url(${circuits}) no-repeat center center;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          border-left: 1px solid ${steel};
          padding: 175px calc(50vw - 615px) 100px 64px;
          @media screen and (max-width: 1400px) and (min-width: ${desktopMinWidth}) {
            padding-right: 80px;
          }
          @media screen and (max-width: ${mobileMaxWidth}) {
            padding-right: 5vw;
          }
        `}
      >
        <img
          src=".././assets/img/queens-building.svg"
          css={`
            width: 500px;
            max-width: 100%;
          `}
          alt=""
          {...decorativeElement}
        />
      </div>
    </div>
  </div>
);

export default Landing;
