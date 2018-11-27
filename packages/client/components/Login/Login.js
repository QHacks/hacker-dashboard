import { Redirect, Link } from "react-router-dom";
import React, { Component } from "react";
import MenuBar from "../MenuBar/index.js";
import * as colors from "../../assets/colors";
import ActionButton from "../ActionButton/ActionButton";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: true
    };
  }

  handleLogin(values) {
    // make API request to authenticate a user using the form values
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
    const inputStyle = `margin: 12px 4px !important; display: block; max-width: 375px;`;
    return (
      <div>
        <MenuBar />
        <div
          css={`
            display: grid;
            grid-template-columns: 45% 55%;
            height: 100vh;
          `}
        >
          <div
            css={`
              padding: 125px 5vw 5vw;
              height: 100%;
            `}
          >
            <h1
              css={`
                color: ${colors.blue};
              `}
            >
              QHacks
            </h1>
            <p
              css={`
                margin-top: 24px;
                color: #8a929f;
              `}
            >
              Welcome back.
            </p>
            <p
              css={`
                margin-top: 12px;
                color: #8a929f;
              `}
            >
              Please login to your account.
            </p>
            <div
              css={`
                margin-top: 64px;
              `}
            >
              <input
                css={inputStyle}
                id="email"
                type="text"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                placeholder="Enter your email address"
              />
              <input
                css={inputStyle}
                id="password"
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>
            <div
              css={`
                margin: 40px 0;
                display: flex;
              `}
            >
              <div
                css={`
                  flex-grow: 1;
                `}
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  onChange={(e) =>
                    this.setState({ rememberMe: e.target.checked })
                  }
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div
                css={`
                  flex-grow: 1;
                `}
              >
                <Link to="/forgot-password">Forgot password</Link>
              </div>
            </div>
            <div>
              <ActionButton color="red">Login</ActionButton>
            </div>
          </div>
          <div
            css={`
              background: url(${require("../../assets/img/circuits.png")})
                no-repeat center center fixed;
              background-size: cover;
              height: 100%;
            `}
          />
        </div>
      </div>
    );
  }
}

export default Login;
