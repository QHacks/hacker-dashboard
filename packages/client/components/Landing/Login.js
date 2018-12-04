import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";

import Landing from "./Landing";
import { SERVER_HOST } from "../../Client";
import ActionButton from "../ActionButton/ActionButton";
import StatusReport from "../StatusReport/StatusReport";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../Client";

const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) @client
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rememberMe: true,
      alert: {
        type: "",
        message: "",
        status: ""
      },
      alertShown: false
    };
  }

  async login() {
    const { email, password } = this.state;

    try {
      const response = await axios.post(`${SERVER_HOST}/oauth/session`, {
        email,
        password,
        grantType: "password"
      });

      this.props.login({
        variables: {
          input: {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          }
        }
      });
    } catch (err) {
      this.setState({
        alert: {
          message: "Unable to log in",
          type: "danger",
          status: null
        },
        alertShown: true
      });
      setTimeout(() => this.setState({ alertShown: false }), 5000);
    }
  }

  render() {
    return (
      <Landing>
        <img
          src="../../assets/img/qhacks-wordmark-colored.svg"
          css="
            max-height: 40px;
          "
          alt="QHacks"
        />
        <p
          className="blurb"
          css="
            margin-top: 24px;
            color: #8a929f;
          "
        >
          Welcome back.
        </p>
        <p
          className="blurb"
          css="
            margin-top: 12px;
            color: #8a929f;
          "
        >
          Please login to your account.
        </p>
        <div
          css="
            margin-top: 64px;
          "
        >
          <input
            id="email"
            type="text"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="Enter your email address"
          />
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>
        <div
          css="
            margin: 40px 0;
            display: flex;
          "
        >
          <div
            css="
              flex-grow: 1;
            "
          >
            <input
              type="checkbox"
              id="rememberMe"
              onChange={(e) => this.setState({ rememberMe: e.target.checked })}
            />{" "}
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div
            css="
              flex-grow: 1;
            "
          >
            <Link className="landingLink" to="/forgot-password">
              Forgot password
            </Link>
          </div>
        </div>
        {this.state.alertShown ? (
          <StatusReport
            type={this.state.alert.type}
            message={this.state.alert.message}
          />
        ) : (
          ""
        )}
        <div>
          <ActionButton color="blue" onClick={() => this.login()}>
            Login
          </ActionButton>{" "}
          <ActionButton internal link="/qhacks-2019/apply">
            Apply
          </ActionButton>
        </div>
      </Landing>
    );
  }
}

export default graphql(LOGIN_MUTATION, { name: "login" })(Login);
