import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function Input(props) {
    return (
        <Form.Input label={props.label}
                    placeholder={props.placeholder}
                    type={props.type}
                    onChange={(event, data) => props.input.onChange(data.value)}/>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired
};

Input.defaultProps = {
    label: '',
    placeholder: ''
};

export default Input;