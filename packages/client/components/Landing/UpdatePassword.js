import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as constants from "../../assets/constants";
import ActionButton from "../ActionButton/ActionButton";
import Landing from "./Landing";

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <Landing>
        <h1
          css={`
            color: ${constants.blue};
          `}
        >
          QHacks
        </h1>
        <h3
          css={`
            margin-top: 24px;
            color: ${constants.blue};
            font-weight: 700;
          `}
        >
          Reset Password
        </h3>
        <p
          css={`
            line-height: 1.6;
            margin-top: 16px;
            color: #8a929f;
          `}
        >
          Please enter your new password!
        </p>
        <div
          css={`
            margin-top: 64px;
          `}
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
          css={`
            margin: 30px 0;
          `}
        >
          <Link to="/login">Know you password? Login here!</Link>
        </div>
        <div>
          <ActionButton color="blue">Reset password</ActionButton>
        </div>
      </Landing>
    );
  }
}

export default UpdatePassword;
