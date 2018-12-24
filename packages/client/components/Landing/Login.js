import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";
import Checkbox from "react-simple-checkbox";
import ActionButton from "../ActionButton/ActionButton";
import { SERVER_HOST } from "../../Client";
import Alert from "../Alert/Alert";
import Landing from "./Landing";
import { checkboxOptions } from "../../assets/constants";

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
      alertShown: false,
      alert: {
        type: "",
        message: "",
        status: ""
      }
    };
  }

  showAlert(message, type, status = null) {
    this.setState({
      alert: {
        message,
        type,
        status
      },
      alertShown: true
    });

    setTimeout(() => this.setState({ alertShown: false }), 6000);
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
      this.showAlert(err.response.data.message, "danger");
    }
  }

  render() {
    return (
      <Landing>
        <img
          src="../../assets/img/qhacks-wordmark-colored.svg"
          css="max-height: 40px;"
          alt="QHacks"
        />
        <p
          className="blurb"
          css={`
            margin-top: 24px;
            color: #8a929f;
          `}
        >
          Welcome back.
        </p>
        <p
          className="blurb"
          css={`
            margin-top: 12px;
            color: #8a929f;
          `}
        >
          Please login to your account.
        </p>
        <div css="margin-top: 64px;">
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
          css={`
            margin: 40px 0;
            display: flex;
          `}
        >
          <div css="flex-grow: 1;">
            <Checkbox
              checked={this.state.rememberMe}
              id="rememberMe"
              {...checkboxOptions}
              onChange={(bool) => this.setState({ rememberMe: bool })}
            />{" "}
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div css="flex-grow: 1;">
            <Link className="landingLink" to="/forgot-password">
              Forgot password
            </Link>
          </div>
        </div>
        <div>
          <ActionButton color="blue" onClick={() => this.login()}>
            Login
          </ActionButton>{" "}
          <ActionButton internal link="/qhacks-2019/apply">
            Apply
          </ActionButton>
        </div>
        <div css="margin: 30px 0px 0px;">
          {this.state.alertShown ? <Alert {...this.state.alert} /> : ""}
        </div>
      </Landing>
    );
  }
}

export default graphql(LOGIN_MUTATION, { name: "login" })(Login);
