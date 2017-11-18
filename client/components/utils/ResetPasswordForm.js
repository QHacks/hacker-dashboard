import React from 'react';
import { Field, reduxForm } from 'redux-form';

let ResetPasswordForm = (props) => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={ handleSubmit }>
			<div>
				<label htmlFor="email">Email</label>
				<Field name="email" component="input" type="email" />
			</div>
			<button type="submit">Send Reset Link</button>
		</form>
	);
}

ResetPasswordForm = reduxForm({ form: 'reset' })(ResetPasswordForm);

export default ResetPasswordForm;
