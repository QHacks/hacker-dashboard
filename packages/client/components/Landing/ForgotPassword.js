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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  getRedirectPath() {
    const locationState = this.props.location.state;

    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    }

    return "/";
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
          Forgot Password
        </h3>
        <p
          className="blurb"
          css={`
            line-height: 1.6;
            margin-top: 16px;
            color: #8a929f;
          `}
        >
          Please provide the email associated with your account to reset your
          password
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
            onClick={() => this.requestPasswordReset()}
          >
            Send reset link
          </ActionButton>
        </div>
      </Landing>
    );
  }
}

export default graphql(GET_AUTHENTICATION_STATUS)(ForgotPassword);
