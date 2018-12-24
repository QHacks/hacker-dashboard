import React from "react";
import { mobileMaxWidth, desktopMinWidth } from "../../assets/constants";
import { decorativeElement } from "../../assets/constants";
import circuits from "../../assets/img/circuits-landing.png";
import { grey, steel, blue } from "../../assets/colors";
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
          input:not([type="checkbox"]):not([type="image"]) {
            margin: 12px 4px !important;
            display: block;
            max-width: 375px;
            background-color: white !important;
            &:focus {
              border: 1px solid ${blue} !important;
            }
          }
          label {
            text-transform: unset;
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
          padding-top: 30vh;
          overflow: hidden;
        `}
      >
        <img
          src=".././assets/img/queens-building.svg"
          css={`
            width: 800px;
            max-width: 90%;
          `}
          alt=""
          {...decorativeElement}
        />
      </div>
    </div>
  </div>
);

export default Landing;
