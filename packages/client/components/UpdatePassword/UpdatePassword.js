import { Divider, Header, Message } from "semantic-ui-react";
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
        <Header
          as="h2"
          content="Update Password"
          color="red"
          textAlign="center"
          className="form apply header"
        />
        {isPasswordUpdated ? null : (
          <p>
            Please enter your new password to complete the reset password
            process.
          </p>
        )}
      </div>
    );
  }

  renderPasswordUpdateForm() {
    const isPasswordUpdated = false;
    const isPasswordUpdatedError = false;
    const isPasswordUpdatedLoading = false;

    if (isPasswordUpdated) {
      return (
        <Message
          success
          size="small"
          header="Password Update Successful!"
          content="Congratulations your password has been updated. Please proceed to login."
        />
      );
    }
    return (
      <UpdatePasswordForm
        onSubmit={this.handleUpdatePasswordForReset.bind(this)}
        updateError={isPasswordUpdatedError}
        updateLoading={isPasswordUpdatedLoading}
      />
    );
  }

  renderPasswordUpdateFooter() {
    return (
      <div className="update-footer">
        <Divider />
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
