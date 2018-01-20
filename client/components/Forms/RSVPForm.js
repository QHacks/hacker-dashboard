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

const RELATIONSHIPS = [
    'Mother',
    'Father',
    'Brother',
    'Sister',
    'Cousin'
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
                header='Something went wrong!'
                content='Oops! Something has gone wrong, please try again.'
            />
        );
    }

    renderRSVPForm() {
        return (
            <Form size="large"
                  error={this.props.rsvpError}
                  loading={this.props.rsvpLoading}
                  onSubmit={this.props.onSubmitRSVP}>

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
                       validate={[required({ msg: 'none' })]}/>

               <Field name="resume"
                      component={SemanticFormField}
                      as={Form.Input}
                      label="Resume"
                      type="link"
                      placeholder="Please enter a link to your resume"
                      validate={[required({ msg: 'none' })]}/>

                  <Field name="emergencyFirstName"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="text"
                         label="Emergency Contact First Name"
                         placeholder="Gavin"
                         validate={required({ msg: 'Please enter the first name of your emergency contact!' })}
                  />

                  <Field name="emergencyLastName"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="text"
                         label="Emergency Contact Last Name"
                         placeholder="Belson"
                         validate={required({ msg: 'Please enter the last name of your emergency contact!' })}
                  />

                  <Field name="emergencyEmail"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="email"
                         label="Emergency Contact Email"
                         placeholder="gavin@hooli.com"
                         validate={[required({ msg: 'Please enter the email address of your emergency contact!' }), email({ msg: 'Please enter a valid email address!' })]}
                  />

                  <Field name="emergencyPhoneNumber"
                         component={SemanticFormField}
                         as={Form.Input}
                         type="tel"
                         label="Emergency Contact Phone Number"
                         placeholder="123-456-7890"
                         validate={[required({ msg: 'Please enter the phone number of your emergency contact!' }), format({
                             with: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                             msg: 'Please enter a valid phone number format. (123-456-789)'
                         })]}
                  />

                  <Field name="emergencyRelation"
                         component={SemanticFormField}
                         as={Form.Select}
                         label="Emergency Contact Relationship"
                         options={RELATIONSHIPS.map(mapValueForSelect)}
                         placeholder='Select a relationship'
                         validate={required({ msg: 'Please select a size' })}
                         search={true}
                  />

                {this.renderRSVPFormErrorMessage()}

                <Button type="submit"
                        content="RSVP"
                        primary
                        type="button"
                        className="button right"
                />

                <Button content="Withdraw Application"
                        secondary
                        type="button"
                        onClick={this.props.onWithdrawApplication}
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
