import { Form, Field } from "react-final-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.renderLoginForm.bind(this);
  }

  renderLoginFormHeader() {
    return <h2>Login to your account</h2>;
  }

  renderLoginFormErrorMessage() {
    return <p>Oops! We cannot authenticate you with those credentials.</p>;
  }

  renderLoginFormFooter() {
    const { applicationsStatus } = this.props;

    return (
      <div>
        <div>
          <Link to="/reset-password">Forgot password?</Link>
          {applicationsStatus === "closed" ? (
            ""
          ) : (
            <p>
              Haven't applied yet? <Link to="/apply">Apply Here</Link>
            </p>
          )}
        </div>
      </div>
    );
  }

  renderLoginForm() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" component="input" placeholder="Email" />
            <Field name="password" component="input" placeholder="Password" />

            <button type="submit">Login</button>
          </form>
        )}
      />
    );
  }

  render() {
    return (
      <div className="login-form-container">
        {this.renderLoginFormHeader()}
        {this.renderLoginForm()}
        {this.renderLoginFormFooter()}
      </div>
    );
  }
}

export default LoginForm;
