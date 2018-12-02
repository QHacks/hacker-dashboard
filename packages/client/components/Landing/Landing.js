import React, { Component } from "react";

import MenuBar from "../MenuBar/index.js";
import * as constants from "../../assets/constants";

class Landing extends Component {
  render() {
    return (
      <div>
        <MenuBar wide={true} />
        <div
          css={`
            display: grid;
            @media screen and (min-width: 2500px) {
              grid-template-columns: 50% 50%;
            }
            @media screen and (max-width: 800px) {
              grid-template-columns: 100%;
              > div:last-child {
                display: none;
              }
            }
            grid-template-columns: minmax(500px, 40%) auto;
            height: 100vh;
          `}
        >
          <div
            css={`
              height: 100%;
              padding: 125px 64px 100px calc(50vw - 615px);
              @media screen and (max-width: 1400px) and (min-width: 860px) {
                padding-left: 80px;
              }
              @media screen and (max-width: 860px) {
                padding-left: 5vw;
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
                color: ${constants.grey};
                text-decoration: underline;
              }
            `}
          >
            {this.props.children}
          </div>
          <div
            css={`
              background: url(${require("../../assets/img/circuits.png")})
                no-repeat center center;
              background-size: cover;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              border-left: 1px solid #ccd3df;
              padding-top: 84px;
            `}
          >
            <img
              src={".././assets/img/queens-building.svg"}
              css={`
                max-width: 80%;
              `}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
