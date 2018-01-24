import { Button, Form, Message } from 'semantic-ui-react';
import { required, confirmation, length } from 'redux-form-validators';
import SemanticFormField from './SemanticFormField';
import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';

function UpdatePasswordForm(props) {
    return (
        <Form size="large"
            success={props.updateSuccessful}
            error={props.updateError}
            loading={props.updateLoading}
            onSubmit={props.handleSubmit}>

            <Field name="password"
                component={SemanticFormField}
                as={Form.Input}
                type="password"
                placeholder="New Password"
                validate={[required({ msg: 'none' }), length({ min: 8, msg: 'Your new password must be at least 8 characters!' })]} />

            <Field name="confirmPassword"
                component={SemanticFormField}
                as={Form.Input}
                type="password"
                placeholder="Confirm New Password"
                validate={[required({ msg: 'none' }), length({ min: 8, msg: 'none' }), confirmation({ field: 'password', msg: 'Passwords do not match!' })]} />

            <Message
                success
                size="small"
                header='Password Update Successful!'
                content=""
            />

            <Message
                error
                size="small"
                header='Oops! Looks like there was an error.'
                content="Please make sure that you arrived at this page with a valid url."
            />

            <Button primary fluid size="large">
                Update Password
            </Button>
        </Form>
    );
}

export default reduxForm({ form: 'updatePassword' })(UpdatePasswordForm);
