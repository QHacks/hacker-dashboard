import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";

import Landing from "./Landing";
import { SERVER_HOST } from "../../Client";
import * as constants from "../../assets/constants";
import ActionButton from "../ActionButton/ActionButton";

const GET_AUTHENTICATION_STATUS = gql`
  query {
    authInfo @client {
      isAuthenticated
    }
  }
`;

class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ""
    };
  }

  getRedirectPath() {
    const locationState = this.props.location.state;

    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    }

    return "/";
  }

  async updatePasswordForReset() {
    const { password } = this.state;
    const { resetHash } = this.props.match.params;

    try {
      const response = await axios.post(
        `${SERVER_HOST}/oauth/updatePasswordForReset`,
        {
          password,
          resetHash
        }
      );

      this.setState({
        success: "Test Success"
      });
    } catch (err) {
      this.setState({
        error: "Test Error"
      });
    }
  }

  render() {
    const { isAuthenticated } = this.props.data.authInfo;

    if (isAuthenticated) {
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

    return (
      <Landing>
        <img
          src={"../../assets/img/qhacks-wordmark-colored.svg"}
          css={`
            max-height: 40px;
          `}
          alt="QHacks"
        />
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
          className="blurb"
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

export default graphql(GET_AUTHENTICATION_STATUS)(UpdatePassword);
