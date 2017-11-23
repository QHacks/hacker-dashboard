import { Button, Form, Segment, Transition, Message } from 'semantic-ui-react';
import { required, email } from 'redux-form-validators';
import { actionCreators } from '../../HackerStore';
import SemanticFormField from './SemanticFormField';
import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';

function ResetPasswordForm(props) {
	return (
		<Form size="large"
			success={props.linkSent}
			error={props.resetError}
			loading={props.resetLoading}
			onSubmit={props.handleSubmit}>

			<Field name="email"
				component={SemanticFormField}
				as={Form.Input}
				type="email"
				placeholder="Email address"
				validate={[ required({ msg: 'none' }), email({ msg: 'Please enter a valid email address!' }) ]} />

			<Message
				success
				size="small"
				header='Reset Password Email Sent!'
				content="Please continue to reset your email by following the instructions sent to the email you provided."
			/>

			<Message
				error
				size="small"
				header='Oops! Looks like there was an error.'
				content="Please make sure that the email you entered is a valid one."
			/>

			<Button primary fluid size="large">
				Send Reset Link
			</Button>
		</Form>
	);
}

export default reduxForm({ form: 'resetPassword' })(ResetPasswordForm);
