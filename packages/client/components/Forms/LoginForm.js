import { Divider, Header, Message } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.less";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.renderLoginForm.bind(this);
  }

  renderLoginFormHeader() {
    return (
      <Header as="h2" color="red" textAlign="center">
        Login to your account
      </Header>
    );
  }

  renderLoginFormErrorMessage() {
    return (
      <Message
        error
        size="small"
        className="error-message"
        header="Invalid Credentials!"
        content="Oops! We cannot authenticate you with those credentials."
      />
    );
  }

  renderLoginFormFooter() {
    const { applicationsStatus } = this.props;

    return (
      <div>
        <div className="fontSize-medium" style={{ marginTop: "40px" }}>
          <Link to="/reset-password">Forgot password?</Link>
          <Divider />
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
