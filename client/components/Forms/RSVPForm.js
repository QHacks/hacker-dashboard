import { Button, Form, Message, Popup } from 'semantic-ui-react';
import SemanticFormField from './SemanticFormField';
import { Field, reduxForm } from 'redux-form';
import { required, email, format } from 'redux-form-validators';

import React, { Component } from 'react';
import './RSVPForm.less';

const SHIRT_SIZES = [
    'Small',
    'Medium',
    'Large',
    'Extra Large'
];

class RSVPForm extends Component {

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

    requiredLabel(label) {
        return (
            <label>
                {label} <span className="required">*</span>
            </label>
        );
    }

    renderWithdrawTrigger() {
        return (
            <Button content="Withdraw Application"
                    secondary
                    type="button"
            />

        );
    }

    renderWithdrawContent() {
        return (
            <Button color="green"
                    content="I'm sure!"
                    onClick={this.props.onWithdrawApplication}
                    type="button"
            />
        );
    }

    renderRSVPForm() {
        const { requiredLabel } = this;
        return (
            <Form size="large"
                  error={this.props.rsvpError}
                  loading={this.props.rsvpLoading}
                  onSubmit={this.props.handleSubmit}>

                <Field name="tshirtSize"
                       component={SemanticFormField}
                       as={Form.Select}
                       label={requiredLabel('T-Shirt Size')}
                       options={SHIRT_SIZES.map(mapValueForSelect)}
                       placeholder='Select a t-shirt size'
                       validate={required({ msg: 'Please select a size!' })}
                       search={true}
                />

                <Field name="favSnack"
                       component={SemanticFormField}
                       as={Form.Input}
                       label={requiredLabel('Favorite Snack')}
                       type="text"
                       placeholder="What's your favorite snack?"
                       validate={[required({ msg: 'none' })]}
                />

                <Field name="emergencyFirstName"
                       component={SemanticFormField}
                       as={Form.Input}
                       type="text"
                       label={requiredLabel('Emergency Contact First Name')}
                       placeholder="Gavin"
                       validate={required({ msg: 'Please enter the first name of your emergency contact!' })}
                />

                <Field name="emergencyLastName"
                       component={SemanticFormField}
                       as={Form.Input}
                       type="text"
                       label={requiredLabel('Emergency Contact Last Name')}
                       placeholder="Belson"
                       validate={required({ msg: 'Please enter the last name of your emergency contact!' })}
                />

                <Field name="emergencyEmail"
                       component={SemanticFormField}
                       as={Form.Input}
                       type="email"
                       label={requiredLabel('Emergency Contact Email')}
                       placeholder="gavin@hooli.com"
                       validate={[required({ msg: 'Please enter the email address of your emergency contact!' }), email({ msg: 'Please enter a valid email address!' })]}
                />

                <Field name="emergencyPhoneNumber"
                       component={SemanticFormField}
                       as={Form.Input}
                       type="tel"
                       label={requiredLabel('Emergency Contact Phone Number')}
                       placeholder="123-456-7890"
                       validate={[required({ msg: 'Please enter the phone number of your emergency contact!' }), format({
                           with: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                           msg: 'Please enter a valid phone number format. (123-456-789)'
                       })]}
                />

                <Field name="emergencyRelationToContact"
                       component={SemanticFormField}
                       as={Form.Input}
                       label={requiredLabel('Emergency Contact Relationship')}
                       type="text"
                       placeholder="What's your relationship with your emergency contact?"
                       validate={[required({ msg: 'none' })]}
                />

                <Field name="resume"
                       component={SemanticFormField}
                       as={Form.Input}
                       label="Resume"
                       type="link"
                       placeholder="Please enter a link to your resume"
                />

                {this.renderRSVPFormErrorMessage()}

                <Button content="RSVP"
                        primary
                />

                <Popup
                    trigger={this.renderWithdrawTrigger()}
                    content={this.renderWithdrawContent()}
                    on='click'
                    position='bottom right'
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
