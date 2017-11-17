import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Segment } from 'semantic-ui-react';

function ApplyForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}
              size="large">
            <Segment>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <Field name="dateOfBirth" component="input" type="date"/>
                </div>
                <div>
                    <label htmlFor="graduationYear">Graduation Year</label>
                    <Field name="graduationYear" component="input" type="number"/>
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field name="phoneNumber" component="input" type="tel"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" component="input" type="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" component="input" type="password"/>
                </div>
            </Segment>
            <Button type="submit"
                    primary>
                Apply
            </Button>
        </Form>
    );
}

export default reduxForm({ form: 'apply' })(ApplyForm);