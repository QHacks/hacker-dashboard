import React, { Component } from "react";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";
import menuClose from "../../assets/img/mobileMenuClose.svg";
import hamburger from "../../assets/img/mobileMenuOpen.svg";
import word from "../../assets/img/qhacks-wordmark-white.svg";
import cubespng from "../../assets/img/mobileMenuCubes.png";
import logo from "../../assets/img/qhacks-crown-white.svg";
import { linkExternalTrusted } from "../../assets/constants";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

class Mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false
    };
  }

  toggleMenu() {
    this.setState((state) => ({ isMenuVisible: !state.isMenuVisible }));
  }

  render() {
    const linkStyle = `
      font-weight: bold;
      display: block;
      margin-bottom: 24px;
    `;
    return (
      <div
        css={`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        `}
      >
        <ContentWrapper>
          <div
            css={`
              width: 100%;
              display: flex;
              height: 64px;
              align-content: center;
              justify-content: space-between;
            `}
          >
            <img css="display: inline-block;" src={crown} alt="QHacks logo" />
            <input
              type="image"
              onClick={() => this.toggleMenu()}
              src={hamburger}
              alt="Open menu"
            />
          </div>
        </ContentWrapper>
        <div
          className={this.state.isMenuVisible ? "no-scroll" : ""}
          css={{
            display: this.state.isMenuVisible ? "block" : "none",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            top: "0px",
            left: "0px",
            zIndex: "5",
            background: "#11213f"
          }}
        >
          <input
            type="image"
            align="right"
            css={{ padding: "32px" }}
            src={menuClose}
            onClick={() => this.toggleMenu()}
            alt="Close menu"
          />
          <div
            css={{
              marginTop: "100px",
              color: "white",
              display: "grid",
              gridTemplateColumns: "1fr"
            }}
          >
            <div
              css={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                " a": {
                  color: "white",
                  textTransform: "uppercase",
                  ":hover": {
                    color: "#fedb01"
                  }
                }
              }}
            >
              <div>
                <img
                  src={logo}
                  css={{ paddingBottom: "11px" }}
                  alt="QHacks Crown"
                />
              </div>
              <div
                css={`
                  padding-bottom: 52px;
                `}
              >
                <img
                  src={word}
                  width="134px"
                  height="34.8px"
                  alt="QHacks Wordmark"
                />
              </div>
              {/* start menu items */}
              <a
                {...linkExternalTrusted}
                href="https://qhacks.io"
                onClick={() => this.toggleMenu()}
                css={linkStyle}
              >
                QHacks 2019
              </a>
              <a
                {...linkExternalTrusted}
                href="https://2018.qhacks.io"
                onClick={() => this.toggleMenu()}
                css={linkStyle}
              >
                Past Events
              </a>
              <a
                {...linkExternalTrusted}
                href="https://medium.com/qhacks"
                onClick={() => this.toggleMenu()}
                css={linkStyle}
              >
                Blog
              </a>
              <a
                {...linkExternalTrusted}
                href="https://github.com/qhacks"
                onClick={() => this.toggleMenu()}
                css={linkStyle}
              >
                Code
              </a>
              {/* end menu items */}
              <div css={{ marginTop: "-100px", pointerEvents: "none" }}>
                <img src={cubespng} alt="Floating cubes" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mobile;
