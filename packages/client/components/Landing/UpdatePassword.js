import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Landing from "./Landing";
import { SERVER_HOST } from "../../Client";
import { blue } from "../../assets/colors";
import ActionButton from "../ActionButton/ActionButton";

class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      success: "",
      error: ""
    };
  }

  async updatePasswordForReset() {
    const { password } = this.state;
    const { resetHash } = this.props.match.params;

    try {
      // const response =
      await axios.post(`${SERVER_HOST}/oauth/updatePasswordForReset`, {
        password,
        resetHash
      });

      this.setState({
        success: "Password successfully reset"
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
      </Landing>
    );
  }
}

export default UpdatePassword;
