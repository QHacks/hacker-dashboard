import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Landing from "./Landing";
import { SERVER_HOST } from "../../Client";
import { blue } from "../../assets/colors";
import ActionButton from "../ActionButton/ActionButton";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  async requestPasswordReset() {
    const { email } = this.state;

    try {
      const response = await axios.post(
        `${SERVER_HOST}/oauth/createResetHash`,
        {
          email
        }
      );

      this.setState({
        success: "Check your email!"
      });
    } catch (err) {
      this.setState({
        error: "Something went wrong. Refresh and try again in a minute."
      });
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
        <h3
          css={`
            margin-top: 24px;
            color: ${blue};
            font-weight: 700;
          `}
        >
          Forgot Password
        </h3>
        <p
          className="blurb"
          css="
            line-height: 1.6;
            margin-top: 16px;
            color: #8a929f;
          "
        >
          Please provide the email associated with your account to reset your
          password
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
        </div>
        <div
          css="
            margin: 30px 0;
          "
        >
          <Link className="landingLink" to="/login">
            Know you password? Login here!
          </Link>
        </div>
        <div>
          <ActionButton
            color="blue"
            onClick={() => this.requestPasswordReset()}
          >
            Send reset link
          </ActionButton>
        </div>
      </Landing>
    );
  }
}

export default ForgotPassword;
