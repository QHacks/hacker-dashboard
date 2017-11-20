import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

/**
 * The current configuration of this component updates the value of the
 * parent ReduxForm Field directly with the new chosen value from the
 * options list.
 */
function Select(props) {
    return (
        <Form.Select placeholder={props.placeholder}
                     search={props.search}
                     options={props.options}
                     onChange={(event, data) => props.input.onChange(data.value)}
        />
    );
}


Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.required,
            text: PropTypes.string.required,
            value: PropTypes.any.required
        })
    ),
    placeholder: PropTypes.string,
    search: PropTypes.bool
};

Select.defaultProps = {
    options: [],
    placeholder: '',
    search: false
};

export default Select;
