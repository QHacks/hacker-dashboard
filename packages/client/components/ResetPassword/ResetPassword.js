import { ResetPasswordForm } from "../Forms";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
  handleResetPassword(values) {
    // fire off an api request to send out reset password link
  }

  renderResetPasswordHeader() {
    return (
      <div
        css={`
          align-items: center;
          display: flex;
          flex-direction: column;
          margin-top: 40px;
          margin-bottom: 30px;
        `}
      >
        <img
          css={`
            height: 130px;
            margin-bottom: 20px;
          `}
          src={require("../../assets/img/qhacks-tricolor-logo.svg")}
        />
        <h2>Reset Password</h2>
        <p>
          Please provide the email associated with your account to reset your
          password.
        </p>
      </div>
    );
  }

  renderResetPasswordForm() {
    return <ResetPasswordForm onSubmit={this.handleResetPassword.bind(this)} />;
  }

  renderResetPasswordFooter() {
    return (
      <div
        css={`
          margin-top: 20px;
          margin-bottom: 40px;
        `}
      >
        <p>
          Know your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
            padding: 30px 20px;
            max-width: 600px;
            width: 100%;
          `}
        >
          {this.renderResetPasswordHeader()}
          {this.renderResetPasswordForm()}
          {this.renderResetPasswordFooter()}
        </div>
      </div>
    );
  }
}

export default ResetPassword;
