import { Redirect } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.renderLoginForm.bind(this);
    this.getRedirectPath.bind(this);
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

  renderLoginForm() {
    const applicationsStatus = "closed";

    return (
      <div
        css={`
          align-items: center;
          box-shadow: 3px 0 25px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          padding: 50px;
          width: 40%;
          z-index: 0;
        `}
      >
        <a href="https://qhacks.io">
          <img
            css={`
              height: 130px;
              margin-bottom: 20px;
            `}
            src={require("../../assets/img/qhacks-tricolor-logo.svg")}
          />
        </a>
        <LoginForm
          onSubmit={this.handleLogin.bind(this)}
          applicationsStatus={applicationsStatus}
        />
      </div>
    );
  }

  renderLoginDisplay() {
    return (
      <div
        css={`
          align-items: center;
          background-color: #000;
          background-image: url("../../assets/img/students-at-hackathon.jpg");
          background-position: center;
          background-size: cover;
          color: white;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          width: 60%;
        `}
      >
        <div
          css={`
            align-items: center;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            height: 100%;
            justify-content: center;
            padding: 50px;
            width: 100%;
          `}
        >
          <div>
            <h1>Dream it. Build it.</h1>
            <h2>QHacks 2018, Queen&apos;s University</h2>
          </div>
        </div>
      </div>
    );
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

    return (
      <div
        css={`
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: 100vh;
          width: 100vw;
        `}
      >
        {this.renderLoginForm()}
        {this.renderLoginDisplay()}
      </div>
    );
  }
}

export default Login;
