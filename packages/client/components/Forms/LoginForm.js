import { Button, Divider, Form, Header, Message } from "semantic-ui-react";
import { required, email } from "redux-form-validators";
import SemanticFormField from "./SemanticFormField";
import { Field, reduxForm } from "redux-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MISC } from "../../strings";
import "./LoginForm.less";

const { APPLICATION_CLOSED_STATUS } = MISC;

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
          {applicationsStatus === APPLICATION_CLOSED_STATUS ? (
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
        size="large"
        error={this.props.loginError}
        loading={this.props.loginLoading}
        onSubmit={this.props.handleSubmit}
      >
        <Field
          name="email"
          component={SemanticFormField}
          as={Form.Input}
          icon="mail"
          type="email"
          placeholder="Email address"
          validate={[
            required({ msg: "none" }),
            email({ msg: "Please enter a valid email address!" })
          ]}
        />

        <Field
          name="password"
          component={SemanticFormField}
          as={Form.Input}
          icon="lock"
          type="password"
          placeholder="Password"
          validate={required({ msg: "none" })}
        />

        {this.renderLoginFormErrorMessage()}

        <Button primary fluid size="large">
          Login
        </Button>
      </Form>
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

export default reduxForm({
  form: "login",
  enableReinitialize: true
})(LoginForm);
