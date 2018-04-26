import { Form } from 'semantic-ui-react';
import React from 'react';

export default function SemanticFormField({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error, warning },
  as: As = input,
  ...props
}) {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }

  return (
    <Form.Field error={touched && !!error}>
      <As
        {...props}
        {...input}
        value={input.value}
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {touched &&
        typeof error === 'string' &&
        ((error !== 'none' && (
          <div className="ui pointing red basic label">{error}</div>
        )) ||
          (warning && (
            <span>
              <i>{warning}</i>
            </span>
          )))}
    </Form.Field>
  );
}
