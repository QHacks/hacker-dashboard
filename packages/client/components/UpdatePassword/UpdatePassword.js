import { UpdatePasswordForm } from "../Forms";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UpdatePassword.less";

class UpdatePassword extends Component {
  handleUpdatePasswordForReset(values) {
    const { password } = values;
    const { hash } = this.props.match.params;

    // send api request to update the password with the hash from url and value from form
  }

  renderPasswordUpdateHeader() {
    const isPasswordUpdated = false;

    return (
      <div className="update-header">
        <img
          src={require("../../assets/img/qhacks-tricolor-logo.svg")}
          className="qhacks-logo"
        />
        <h2>Update Password</h2>
        {isPasswordUpdated ? null : ( // eslint-disable-line multiline-ternary
          <p>
            Please enter your new password to complete the reset password
            process.
          </p>
        )}
      </div>
    );
  }

  renderPasswordUpdateForm() {
    return (
      <UpdatePasswordForm
        onSubmit={this.handleUpdatePasswordForReset.bind(this)}
      />
    );
  }

  renderPasswordUpdateFooter() {
    return (
      <div className="update-footer">
        <p className="fontSize-medium textAlign-center">
          Wrong place? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="update-container">
        <div className="update-form-container">
          {this.renderPasswordUpdateHeader()}
          {this.renderPasswordUpdateForm()}
          {this.renderPasswordUpdateFooter()}
        </div>
      </div>
    );
  }
}

export default UpdatePassword;
