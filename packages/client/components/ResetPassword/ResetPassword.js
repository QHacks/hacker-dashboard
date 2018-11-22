import { ResetPasswordForm } from "../Forms";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.less";

class ResetPassword extends Component {
  handleResetPassword(values) {
    // fire off an api request to send out reset password link
  }

  renderResetPasswordHeader() {
    return (
      <div className="reset-header">
        <img
          src={require("../../assets/img/qhacks-tricolor-logo.svg")}
          className="qhacks-logo"
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
      <div className="application-footer">
        <p className="fontSize-medium textAlign-center">
          Know your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="reset-container">
        <div className="reset-form-container">
          {this.renderResetPasswordHeader()}
          {this.renderResetPasswordForm()}
          {this.renderResetPasswordFooter()}
        </div>
      </div>
    );
  }
}

export default ResetPassword;
