import { Form, Field } from "react-final-form";
import React from "react";

const UpdatePasswordForm = (props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="password" component="input" placeholder="New Password" />
          <Field
            name="confirmpassword"
            component="input"
            placeholder="Confirm New Password"
          />

          <button type="submit">Update Password</button>
        </form>
      )}
    />
  );
};

export default UpdatePasswordForm;
