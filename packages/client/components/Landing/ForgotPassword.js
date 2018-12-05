import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ActionButton from "../ActionButton/ActionButton";
import { blue } from "../../assets/colors";
import { SERVER_HOST } from "../../Client";
import Alert from "../Alert/Alert";
import Landing from "./Landing";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
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

  async requestPasswordReset() {
    const { email } = this.state;

    try {
      await axios.post(`${SERVER_HOST}/oauth/createResetHash`, {
        email
      });

      this.showAlert(
        "Password reset link has been successfully sent!",
        "success"
      );
    } catch (err) {
      this.showAlert(
        "Could not submit request to reset password! Please try again!",
        "danger"
      );
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
          password.
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
            Know your password? Login here!
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
        {this.state.alertShown ? (
          <Alert
            type={this.state.alert.type}
            message={this.state.alert.message}
          />
        ) : (
          ""
        )}
      </Landing>
    );
  }
}

export default ForgotPassword;
