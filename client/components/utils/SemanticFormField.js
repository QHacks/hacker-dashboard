import { Form, Input } from 'semantic-ui-react';
import React from 'react';
import './LoginForm.less';


export default function semanticFormField({ input, type, label, placeholder, meta: { touched, error, warning }, as: As = input, ...props }) {

	function handleChange(e, { value }) {
		return input.onChange(value);
	}

	return (
		<Form.Field error={touched && error }>
				<As {...props} {...input}
					value={input.value}
					type={type} label={label}
					placeholder={placeholder}
					onChange={handleChange} />
		</Form.Field>
	);
}
