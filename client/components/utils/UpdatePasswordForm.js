import React from 'react';
import { Field, reduxForm } from 'redux-form';

function UpdatePasswordForm(props) {
	const { handleSubmit } = props;
	return (
		<form onSubmit={ handleSubmit }>
			<div>
				<label htmlFor="password">New Password</label>
				<Field name="password" component="input" type="password" />
			</div>
			<button type="submit">Update Password</button>
		</form>
	);
}

export default reduxForm({ form: 'updatePassword' })(UpdatePasswordForm);
