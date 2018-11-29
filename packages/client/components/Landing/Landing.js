import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import MenuBar from "../MenuBar/index.js";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRedirectPath() {
    const locationState = this.props.location.state;

    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    }

    return "/";
  }

  render() {
    const authenticated = false;

    if (authenticated) {
      return (
        <Redirect
          to={{
            pathname: this.getRedirectPath(),
            state: {
              from: this.props.location
            }
          }}
        />
      );
    }
    return (
      <div>
        <MenuBar />
        <div
          css={`
            display: grid;
            grid-template-columns: 40% 60%;
            @media screen and (min-width: 1200px) {
              grid-template-columns: 50% 50%;
            }
            height: 100vh;
          `}
        >
          <div
            css={`
              height: 100%;
              padding: 125px 64px 100px calc(50vw - 555px);
              @media screen and (max-width: 1400px) and (min-width: 1200px) {
                padding-left: 145px;
              }
              @media screen and (max-width: 1200px) and (min-width: 860px) {
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
            `}
          >
            {this.props.children}
          </div>
          <div
            css={`
              background: url(${require("../../assets/img/landing.png")})
                no-repeat center bottom;
              background-size: cover;
              height: 100%;
            `}
          />
        </div>
      </div>
    );
  }
}

export default Landing;
