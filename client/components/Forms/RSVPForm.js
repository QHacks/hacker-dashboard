import { Button, Divider, Form, Header, Message } from 'semantic-ui-react';
import { required, email } from 'redux-form-validators';
import SemanticFormField from './SemanticFormField';
import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';
import './RSVPForm.less';

const SHIRT_SIZES = [
    'Small',
    'Medium',
    'Large',
    'Extra Large'
];

class RSVPForm extends Component {
    constructor(props) {
        super(props);

        this.renderRSVPForm.bind(this);
    }

    renderRSVPFormErrorMessage() {
        return (
            <Message
                error
                size='small'
                className="error-message"
                header='Invalid Credentials!'
                content='Oops! We cannot authenticate you with those credentials.'
            />
        );
    }

    renderRSVPForm() {
        return (
            <Form size="large"
                  error={this.props.loginError}
                  loading={this.props.loginLoading}
                  onSubmit={this.props.handleSubmit}>

                <Field name="tshirt"
                       component={SemanticFormField}
                       as={Form.Select}
                       label="T-Shirt Size"
                       options={SHIRT_SIZES.map(mapValueForSelect)}
                       placeholder='Select a t-shirt size'
                       validate={required({ msg: 'Please select a size!' })}
                       search={true}
                />

                <Field name="favSnack"
                       component={SemanticFormField}
                       as={Form.Input}
                       label="Favorite Snack"
                       type="email"
                       placeholder="What's your favorite snack?"
                       validate={[required({ msg: 'none' }), email({ msg: 'Please enter a valid email address!' })]}/>

               <Field name="resume"
                      component={SemanticFormField}
                      as={Form.Input}
                      label="Resume"
                      type="link"
                      placeholder="Please enter a link to your resume!"
                      validate={[required({ msg: 'none' }), email({ msg: 'Please enter a valid email address!' })]}/>

                  <Field name="emergencyFirstName"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="text"
                         label="Emergency Contact First Name"
                         placeholder="Morty"
                         validate={required({ msg: 'Please enter your first name!' })}
                  />

                  <Field name="emergencyLastName"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="text"
                         label="Emergency Contact Last Name"
                         placeholder="Smith"
                         validate={required({ msg: 'Please enter your last name!' })}
                  />

                  <Field name="emergencyEmail"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="email"
                         label="Emergency Contact Email"
                         placeholder="morty.smith@example.com"
                         validate={[required({ msg: 'Please enter an email address!' }), email({ msg: 'Please enter a valid email address!' })]}
                  />

                  <Field name="emergencyRelation"
                         component={SemanticFormField}
                         as={Form.Select}
                         label="Emergency Contact Relationship"
                         options={SHIRT_SIZES.map(mapValueForSelect)}
                         placeholder='Select a relationship!'
                         validate={required({ msg: 'Please select a size' })}
                         search={true}
                  />

                {this.renderRSVPFormErrorMessage()}

                <Button content="RSVP"
                        primary
                        type="button"
                        className="button right"
                />

                <Button content="Withdraw Application"
                        secondary
                        type="button"
                />

            </Form>
        );
    }

    render() {
        return (
            <div className="rsvp-form-container">
                {this.renderRSVPForm()}
            </div>
        );
    }
}

function mapValueForSelect(value) {
    return {
        key: value,
        text: value,
        value
    };
}

export default reduxForm({
    form: 'rsvp',
    enableReinitialize: true
})(RSVPForm);
