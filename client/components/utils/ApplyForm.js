import { confirmation, date, email, format, length, required } from 'redux-form-validators';
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { actionCreators, selectors } from '../../HackerStore';
import SemanticFormField from './SemanticFormField';
import { Field, reduxForm } from 'redux-form';
import mlhSchools from './mlhSchools.json';
import FormProgress from './FormProgress';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ApplyForm.less';

const { applicationPageUpdate } = actionCreators;

const DEGREE_TYPES = [
    'Bachelor\'s degree',
    'Master\'s degree',
    'Ph.D.',
    'High School',
    'Other'
];

const FORM_STEPS = [
    'Basic Information',
    'Education',
    'Hackathon Experience'
];

const GENDERS = [
    'Female',
    'Male',
    'Other',
    'Prefer not to say'
];

const GRADUATION_YEARS = [
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    'Other'
];

const MONTHS_IN_A_YEAR = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const NUMBER_OF_HACKATHONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

function PageOne(props) {
    return (
        <Segment className={props.className}>
            <Field name="firstName"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="text"
                   label="First Name"
                   placeholder="Morty"
                   validate={required({ msg: 'none' })}
            />

            <Field name="lastName"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="text"
                   label="Last Name"
                   placeholder="Smith"
                   validate={required({ msg: 'none' })}
            />

            <Field name="email"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="email"
                   label="Email Address"
                   placeholder="morty.smith@example.com"
                   validate={[required({ msg: 'none' }), email({ msg: 'Please enter a valid email address!' })]}
            />

            <Field name="phoneNumber"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="tel"
                   label="Phone Number"
                   placeholder="1-234-567-8900"
                   validate={[required({ msg: 'none' }), format({
                       with: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                       msg: 'Please enter a valid phone number format. (123-456-789)'
                   })]}
            />

            <Field name="dateOfBirth"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="date"
                   label="Date of Birth"
                   placeholder="yyyy-mm-dd"
                   validate={[required({ msg: 'none' }), date({ format: 'yyyy-mm-dd' })]}
            />

            <Field name="gender"
                   component={SemanticFormField}
                   required
                   as={Form.Select}
                   label="What gender do you identify with?"
                   options={GENDERS.map(mapValueForSelect)}
                   placeholder='Female'
                   validate={required({ msg: 'none' })}
                   search={true}
            />

            <Field name="password"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="password"
                   label="Password"
                   placeholder='Password'
                   validate={[required({ msg: 'none' }), length({
                       min: 8,
                       msg: 'Your password must be at least 8 characters!'
                   })]}
            />

            <Field name="confirmPassword"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="password"
                   label="Confirm Password"
                   placeholder='Confirm Password'
                   validate={[required({ msg: 'none' }), length({
                       min: 8,
                       msg: 'Your password must be at least 8 characters!'
                   }), confirmation({ field: 'password', msg: 'You passwords do not match.' })]}
            />
        </Segment>
    );
}

function PageTwo(props) {
    return (
        <Segment className={props.className}>
            <Field name="school"
                   component={SemanticFormField}
                   required
                   as={Form.Select}
                   label="School"
                   options={mlhSchools.map(mapValueForSelect)}
                   placeholder="Queen's University"
                   validate={required({ msg: 'none' })}
                   search={true}
            />

            <Field name="degreeType"
                   component={SemanticFormField}
                   required
                   as={Form.Select}
                   label="Degree Type"
                   options={DEGREE_TYPES.map(mapValueForSelect)}
                   placeholder="Bachelor's degree"
                   validate={required({ msg: 'none' })}
                   search={true}
            />

            <Field name="program"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="text"
                   label="Program"
                   placeholder='Computer Science'
                   validate={required({ msg: 'none' })}
            />

            <Field name="graduationYear"
                   component={SemanticFormField}
                   required
                   as={Form.Select}
                   label="Graduation Year"
                   options={GRADUATION_YEARS.map(mapValueForSelect)}
                   placeholder="2019"
                   validate={required({ msg: 'none' })}
                   search={true}
            />

            <Field name="graduationMonth"
                   component={SemanticFormField}
                   required
                   as={Form.Select}
                   label="Graduation Month"
                   options={MONTHS_IN_A_YEAR.map(mapValueForSelect)}
                   placeholder="January"
                   validate={required({ msg: 'none' })}
                   search={true}
            />

            <Field name="travelOrigin"
                   component={SemanticFormField}
                   required
                   as={Form.Input}
                   type="text"
                   label="Where will you be travelling from?"
                   placeholder='Kingston, ON'
                   validate={required({ msg: 'none' })}
            />
        </Segment>
    );
}

function PageThree(props) {
    return (
        <Segment className={props.className}>
            <Field name="numberOfHackathons"
                   component={SemanticFormField}
                   required
                   as={Form.Select}
                   label="How many hackathons have you attended?"
                   options={NUMBER_OF_HACKATHONS.map(mapValueForSelect)}
                   placeholder="#"
                   validate={required({ msg: 'none' })}
                   search={true}
            />

            <Field name="whyQhacks"
                   component={SemanticFormField}
                   required
                   as={Form.TextArea}
                   label="Why do you want to come to QHacks 2018? (1000 characters max)"
                   validate={[required({ msg: 'none' }), length({
                       max: 1000,
                       msg: 'Your answer cannot exceed 1000 characters!'
                   })]}
            />

            <Field name="links"
                   component={SemanticFormField}
                   required
                   as={Form.TextArea}
                   label="Where can we find you online? e.g. GitHub, LinkedIn, etc."
            />

            <p>By applying you agree to adhere to <a target="_blank" rel="noopener noreferrer"
                                                     href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
                MLH's Code of Conduct</a>.</p>
            {/*<Field name="isCodeOfConductAccepted"
				component={SemanticFormField}
				as={Form.Checkbox}
				label={
					<label>
						I have read and agree to adhere to <a target="_blank" rel="noopener noreferrer" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
						MLHs Code of Conduct</a>.
					</label>
				}
				validate={}
			/>*/}
        </Segment>
    );
}

const Pages = [
    (props) => <PageOne {...props}/>,
    (props) => <PageTwo {...props}/>,
    (props) => <PageThree {...props}/>
];

function mapValueForSelect(value) {
    return {
        key: value,
        text: value,
        value
    };
}

function PreviousPageButton(props) {
    return (
        <Button content="Previous"
                icon="left arrow"
                labelPosition="left"
                secondary
                type="button"
                onClick={props.onClick}
        />
    );
}

function NextPageButton(props) {
    return (
        <Button content="Next"
                icon="right arrow"
                labelPosition="right"
                secondary
                type="button"
                className="button right"
                onClick={props.onClick}
        />
    );
}

function SubmitButton() {
    return (
        <Button type="submit"
                content="Apply"
                primary
                className="button right"
        />
    );
}

class ApplyForm extends Component {

    handlePageUpdate(applicationPage) {
        this.props.applicationPageUpdate({ applicationPage });
    }

    renderApplicationFormErrorMessage() {
        return (
            <Message
                error
                size='small'
                className="error-message"
                header='Application Could Not Be Submitted!'
                content='Please double check your application for any errors.'
            />
        );
    }

    render() {
        const { applicationPage } = this.props;
        const numberOfPages = Pages.length;
        const Buttons = [];

        if (applicationPage > 0 && applicationPage < numberOfPages) {
            Buttons.push(
                <PreviousPageButton key="application-prev-page-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.handlePageUpdate(applicationPage - 1);
                                    }}
                />
            );
        }
        if (applicationPage >= 0 && applicationPage < numberOfPages - 1) {
            Buttons.push(
                <NextPageButton key="application-next-page-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.handlePageUpdate(applicationPage + 1);
                                }}
                />
            );
        } else if (applicationPage === numberOfPages - 1) {
            Buttons.push(<SubmitButton key="application-submit-button"/>);
        }

        return (
            <Form onSubmit={this.props.handleSubmit}
                  size="large"
                // error={this.props.applicationError}
                  error
                  loading={this.props.applicationLoading}>

                <FormProgress steps={FORM_STEPS}
                              currentStepIndex={applicationPage}
                              onClick={(e) => this.handlePageUpdate(Number(e.currentTarget.getAttribute('data-value')))}
                />

                {Pages.map((Page, index) => (
                    <Page key={`application-page-${index}`}
                          className={
                              index !== applicationPage
                                  ? 'hidden'
                                  : ''
                          }
                    />
                ))}
                {this.renderApplicationFormErrorMessage()}
                <div className="container buttons">
                    {Buttons}
                </div>
            </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        applicationPage: selectors.getApplicationPage(state)
    };
}

ApplyForm = connect(mapStateToProps, { applicationPageUpdate })(ApplyForm);

export default reduxForm({
    form: 'apply',
    initialValues: {
        isCodeOfConductAccepted: true
    }
})(ApplyForm);
