import { Form, Field } from "react-final-form";
import React from "react";

const ResetPasswordForm = (props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email" component="input" placeholder="Email" />

          <button type="submit">Send Reset Link</button>
        </form>
      )}
    />
  );
};

export default ResetPasswordForm;
