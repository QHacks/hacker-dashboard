import React from 'react';
import { Field, reduxForm } from 'redux-form';

function ResetPasswordForm(props) {
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

export default reduxForm({ form: 'resetPassword' })(ResetPasswordForm);
