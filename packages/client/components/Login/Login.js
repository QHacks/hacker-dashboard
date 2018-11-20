import { Redirect } from "react-router-dom";
import { Header } from "semantic-ui-react";
import LoginForm from "../Forms/LoginForm";
import React, { Component } from "react";
import "./Login.less";

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
    const loginLoading = false;
    const loginError = false;
    const applicationsStatus = "closed";

    return (
      <div className="login-form-wrapper">
        <a href="https://qhacks.io">
          <img
            src={require("../../assets/img/qhacks-tricolor-logo.svg")}
            className="qhacks-logo-login"
          />
        </a>
        <LoginForm
          onSubmit={this.handleLogin.bind(this)}
          applicationsStatus={applicationsStatus}
          loginLoading={loginLoading}
          loginError={loginError}
        />
      </div>
    );
  }

  renderLoginDisplay() {
    return (
      <div className="login-picture">
        <div className="login-picture-overlay">
          <div>
            <Header as="h1" className="fontWeight-normal" inverted size="huge">
              Dream it. Build it.
            </Header>
            <Header
              as="h2"
              className="fontWeight-lighter"
              inverted
              size="medium"
            >
              QHacks 2018, Queen&apos;s University
            </Header>
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
      <div className="login-container">
        {this.renderLoginForm()}
        {this.renderLoginDisplay()}
      </div>
    );
  }
}

export default Login;
