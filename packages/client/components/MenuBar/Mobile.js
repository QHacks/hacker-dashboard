import React, { Component } from "react";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";
import menuClose from "../../assets/img/mobileMenuClose.svg";
import hamburger from "../../assets/img/mobileMenuOpen.svg";
import word from "../../assets/img/qhacks-wordmark-colored.svg";
import { linkExternalTrusted } from "../../assets/constants";
import { blue, blueLight } from "../../assets/colors";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { Link } from "react-router-dom";
import DropdownMenu from "../DropdownMenu/Mobile";

class Mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false
    };
  }

  toggleMenu() {
    this.setState(
      (state) => ({ isMenuVisible: !state.isMenuVisible }),
      () => {
        document.body.style.overflow = this.state.isMenuVisible
          ? "hidden"
          : "visible";
      }
    );
  }

  render() {
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
            backgroundColor: "white"
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
              width: "100%",
              gridTemplateColumns: "1fr"
            }}
          >
            <div
              css={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                width: "100%",
                "a, button": {
                  fontWeight: 600,
                  width: "100%",
                  color: `${blue} !important`,
                  textTransform: "uppercase",
                  ":active": {
                    color: `${blueLight} !important`
                  },
                  display: "block",
                  padding: "12px 0",
                  border: "none",
                  background: "none"
                }
              }}
            >
              <div>
                <img
                  src={crown}
                  width="150"
                  height="77.59"
                  css={{ paddingBottom: "20px" }}
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
              >
                QHacks 2019
              </a>
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
              <a
                {...linkExternalTrusted}
                href="https://medium.com/qhacks"
                onClick={() => this.toggleMenu()}
              >
                Blog
              </a>
              <a
                {...linkExternalTrusted}
                href="https://github.com/qhacks"
                onClick={() => this.toggleMenu()}
              >
                Code
              </a>
              <Link to="/qhacks-2019/apply" onClick={() => this.toggleMenu()}>
                Apply
              </Link>
              {/* end menu items */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mobile;
