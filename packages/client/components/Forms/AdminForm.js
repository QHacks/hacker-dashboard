import {
  confirmation,
  email,
  format,
  length,
  required
} from 'redux-form-validators';
import { Field, getFormSyncErrors, getFormValues, reduxForm } from 'redux-form';
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { actionCreators, selectors } from '../../HackerStore';
import SemanticFormField from './SemanticFormField';
import { flatten, isEmpty, pick } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ApplyForm.less';

const {
  applicationFormErrorMessagesUpdate,
  applicationError: applicationErrorUpdate
} = actionCreators;
const { getApplicationFormErrorMessages } = selectors;

function mapValueForSelect(value) {
  return {
    key: value,
    text: value,
    value
  };
}

function SubmitButton() {
  return (
    <Button type="submit" content="Register" primary className="button right" />
  );
}

function validateFormBeforeNextPage(values, props) {
  const { applicationPage, syncErrors } = props;
  const errors = pick(
    syncErrors,
    flatten(FORM_FIELDS_BY_PAGE.slice(0, applicationPage + 1))
  );
  if (!isEmpty(errors)) {
    props.applicationFormErrorMessagesUpdate({
      messages: Object.values(errors)
    });
    props.applicationErrorUpdate();
    return false;
  }

  props.applicationFormErrorMessagesUpdate({ messages: Object.values(errors) });
  props.applicationErrorUpdate({ applicationError: false });
  return true;
}

class AdminForm extends Component {

  renderApplicationFormErrorMessage(errorMessages = []) {
    return (
      <Message
        error
        size="small"
        className="error-message"
        header="Your application is invalid!"
        list={errorMessages}
      />
    );
  }

  render() {
    const { applicationPage } = this.props;

    return (
      <Form
        onSubmit={this.props.handleSubmit}
        size="large"
        error={this.props.applicationError}
        loading={this.props.applicationLoading}
      >
        <Segment>
          <Field
            name="firstName"
            component={SemanticFormField}
            as={Form.Input}
            type="text"
            label="First Name"
            placeholder="Morty"
            validate={required({ msg: 'Please enter your first name!' })}
          />

          <Field
            name="lastName"
            component={SemanticFormField}
            as={Form.Input}
            type="text"
            label="Last Name"
            placeholder="Smith"
            validate={required({ msg: 'Please enter your last name!' })}
          />

          <Field
            name="email"
            component={SemanticFormField}
            as={Form.Input}
            type="email"
            label="Email Address"
            placeholder="morty.smith@example.com"
            validate={[
              required({ msg: 'Please enter an email address!' }),
              email({ msg: 'Please enter a valid email address!' })
            ]}
          />

          <Field
            name="phoneNumber"
            component={SemanticFormField}
            as={Form.Input}
            type="tel"
            label="Phone Number"
            placeholder="123-456-7890"
            validate={[
              required({ msg: 'Please enter a phone number!' }),
              format({
                // regex found here: https://www.regextester.com/1978. Works on all intl. phone numbers tested
                with: /^((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))$/,
                msg: 'Please enter a valid phone number format. (123-456-7890)'
              })
            ]}
          />

					<Field
            name="role"
            component={SemanticFormField}
            as={Form.Input}
            type="text"
            label="Role at QHacks"
            placeholder="Co-Chair"
            validate={required({ msg: 'Please enter your role!' })}
          />

          <Field
            name="password"
            component={SemanticFormField}
            as={Form.Input}
            type="password"
            label="Password"
            placeholder="Password"
            validate={[
              required({ msg: 'You must supply a password!' }),
              length({
                min: 8,
                msg: 'Your password must be at least 8 characters!'
              })
            ]}
          />

          <Field
            name="confirmPassword"
            component={SemanticFormField}
            as={Form.Input}
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            validate={[
              required({ msg: 'You must confirm your password!' }),
              length({
                min: 8,
                msg: 'Your password must be at least 8 characters!'
              }),
              confirmation({
                field: 'password',
                msg: 'You passwords do not match.'
              })
            ]}
          />
        </Segment>
        {this.renderApplicationFormErrorMessage(
          this.props.applicationFormErrorMessage
        )}
        <div className="container buttons">
          <SubmitButton key="application-submit-button" />
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    applicationFormErrorMessage: getApplicationFormErrorMessages(state),
    syncErrors: getFormSyncErrors('apply')(state),
    values: getFormValues('apply')(state)
  };
}

AdminForm = connect(mapStateToProps, {
  applicationFormErrorMessagesUpdate,
  applicationErrorUpdate
})(AdminForm);

export default reduxForm({
  form: 'apply',
  initialValues: {
    isCodeOfConductAccepted: true
  }
  // validate: validateForm
})(AdminForm);
