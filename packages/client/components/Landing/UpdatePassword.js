import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ActionButton from "../ActionButton/ActionButton";
import { SERVER_HOST } from "../../Client";
import { blue } from "../../assets/colors";
import Alert from "../Alert/Alert";
import Landing from "./Landing";

class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
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

    setTimeout(() => this.setState({ alertShown: false }), 5000);
  }

  async updatePasswordForReset() {
    const { password } = this.state;
    const { resetHash } = this.props.match.params;

    try {
      await axios.post(`${SERVER_HOST}/oauth/updatePasswordForReset`, {
        password,
        resetHash
      });

      this.showAlert("Password has been successfully reset!", "success");
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
          Reset Password
        </h3>
        <p
          className="blurb"
          css="
            line-height: 1.6;
            margin-top: 16px;
            color: #8a929f;
          "
        >
          Please enter your new password!
        </p>
        <div
          css="
            margin-top: 64px;
          "
        >
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
            onClick={() => this.updatePasswordForReset()}
          >
            Reset password
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

export default UpdatePassword;
