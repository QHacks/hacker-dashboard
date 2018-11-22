import { UpdatePasswordForm } from "../Forms";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UpdatePassword extends Component {
  handleUpdatePasswordForReset(values) {
    const { password } = values;
    const { hash } = this.props.match.params;

    // send api request to update the password with the hash from url and value from form
  }

  renderPasswordUpdateHeader() {
    const isPasswordUpdated = false;

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
      <div
        css={`
          margin-top: 20px;
          margin-bottom: 40px;
        `}
      >
        <p className="fontSize-medium textAlign-center">
          Wrong place? <Link to="/login">Login here</Link>
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
          {this.renderPasswordUpdateHeader()}
          {this.renderPasswordUpdateForm()}
          {this.renderPasswordUpdateFooter()}
        </div>
      </div>
    );
  }
}

export default UpdatePassword;
