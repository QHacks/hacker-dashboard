import { confirmation, date, email, format, length, required } from 'redux-form-validators';
import { Field, getFormSyncErrors, getFormValues, reduxForm } from 'redux-form';
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { actionCreators, selectors } from "../../HackerStore";
import SemanticFormField from './SemanticFormField';
import mlhSchools from '../utils/mlhSchools.json';
import { flatten, isEmpty, pick } from 'lodash';
import FormProgress from './FormProgress';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ApplyForm.less';

const { applicationFormErrorMessagesUpdate, applicationError: applicationErrorUpdate } = actionCreators;
const { getApplicationFormErrorMessages } = selectors;

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

const FORM_FIELDS_BY_PAGE = [
		['firstName', 'lastName', 'email', 'phoneNumber', 'dateOfBirth', 'gender', 'password', 'confirmPassword'],
		['school', 'degreeType', 'program', 'graduationYear', 'graduationMonth', 'travelOrigin'],
		['numberOfHackathons', 'whyQhacks', 'links']
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
									 as={Form.Input}
									 type="text"
									 label="First Name"
									 placeholder="Morty"
									 validate={required({ msg: 'Please enter your first name!' })}
						/>

						<Field name="lastName"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="text"
									 label="Last Name"
									 placeholder="Smith"
									 validate={required({ msg: 'Please enter your last name!' })}
						/>

						<Field name="email"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="email"
									 label="Email Address"
									 placeholder="morty.smith@example.com"
									 validate={[required({ msg: 'Please enter an email address!' }), email({ msg: 'Please enter a valid email address!' })]}
						/>

						<Field name="phoneNumber"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="tel"
									 label="Phone Number"
									 placeholder="123-456-7890"
									 validate={[required({ msg: 'Please enter a phone number!' }), format({
											 with: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
											 msg: 'Please enter a valid phone number format. (123-456-789)'
									 })]}
						/>

						<Field name="dateOfBirth"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="date"
									 label="Date of Birth"
									 placeholder="yyyy-mm-dd"
									 validate={[required({ msg: 'Please supply your date of birth' }), date({ format: 'yyyy-mm-dd' })]}
						/>

						<Field name="gender"
									 component={SemanticFormField}
									 as={Form.Select}
									 label="What gender do you identify with?"
									 options={GENDERS.map(mapValueForSelect)}
									 placeholder='Select a gender'
									 validate={required({ msg: 'Please select a gender' })}
									 search={true}
						/>

						<Field name="password"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="password"
									 label="Password"
									 placeholder='Password'
									 validate={[required({ msg: 'You must supply a password!' }), length({
											 min: 8,
											 msg: 'Your password must be at least 8 characters!'
									 })]}
						/>

						<Field name="confirmPassword"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="password"
									 label="Confirm Password"
									 placeholder='Confirm Password'
									 validate={[required({ msg: 'You must confirm your password!' }), length({
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
									 as={Form.Select}
									 label="School"
									 options={mlhSchools.map(mapValueForSelect)}
									 placeholder="Select a school"
									 validate={required({ msg: 'Please select a school!' })}
									 search={true}
						/>

						<Field name="degreeType"
									 component={SemanticFormField}
									 as={Form.Select}
									 label="Degree Type"
									 options={DEGREE_TYPES.map(mapValueForSelect)}
									 placeholder="Select a degree type"
									 validate={required({ msg: 'Please select a degree type!' })}
									 search={true}
						/>

						<Field name="program"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="text"
									 label="Program"
									 placeholder='Computer Science'
									 validate={required({ msg: 'Please enter your school program!' })}
						/>

						<Field name="graduationYear"
									 component={SemanticFormField}
									 as={Form.Select}
									 label="Graduation Year"
									 options={GRADUATION_YEARS.map(mapValueForSelect)}
									 placeholder="Select a graduation year"
									 validate={required({ msg: 'Please select your graduation year!' })}
									 search={true}
						/>

						<Field name="graduationMonth"
									 component={SemanticFormField}
									 as={Form.Select}
									 label="Graduation Month"
									 options={MONTHS_IN_A_YEAR.map(mapValueForSelect)}
									 placeholder="Select a graduation month"
									 validate={required({ msg: 'Please select a graduation month!' })}
									 search={true}
						/>

						<Field name="travelOrigin"
									 component={SemanticFormField}
									 as={Form.Input}
									 type="text"
									 label="Where will you be travelling from?"
									 placeholder='Kingston, ON'
									 validate={required({ msg: 'Please tell us where you plan on travelling from!' })}
						/>
				</Segment>
		);
}

function PageThree(props) {
		return (
				<Segment className={props.className}>
						<Field name="numberOfHackathons"
									 component={SemanticFormField}
									 as={Form.Select}
									 label="How many hackathons have you attended?"
									 options={NUMBER_OF_HACKATHONS.map(mapValueForSelect)}
									 placeholder="#"
									 validate={required({ msg: 'Please select the number of hackathons that you have attended!' })}
									 search={true}
						/>

						<Field name="whyQhacks"
									 component={SemanticFormField}
									 as={Form.TextArea}
									 label="Why do you want to come to QHacks 2018? (1000 characters max)"
									 validate={[required({ msg: 'Please tell us why you want to come to QHacks 2018!' }), length({
											 max: 1000,
											 msg: 'Your answer cannot exceed 1000 characters!'
									 })]}
						/>

						<Field name="links"
									 component={SemanticFormField}
									 as={Form.TextArea}
									 label="Where can we find you online? e.g. GitHub, LinkedIn, etc."
						/>

						<p>By applying you agree to adhere to <a target="_blank" rel="noopener noreferrer"
																										 href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
								MLH's Code of Conduct</a>.</p>
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

function validateFormBeforeNextPage(values, props) {
		const { applicationPage, syncErrors } = props;
		const errors = pick(syncErrors, flatten(FORM_FIELDS_BY_PAGE.slice(0, applicationPage + 1)));
		if (!isEmpty(errors)) {
				props.applicationFormErrorMessagesUpdate({ messages: Object.values(errors) });
				props.applicationErrorUpdate();
				return false;
		}

		props.applicationFormErrorMessagesUpdate({ messages: Object.values(errors) });
		props.applicationErrorUpdate({ applicationError: false });
		return true;
}

class ApplyForm extends Component {

		handlePreviousPageUpdate(applicationPage) {
				this.props.onPageUpdate(applicationPage);

		}

		handleNextPageUpdate(applicationPage) {
				if (validateFormBeforeNextPage(this.props.values, this.props)) {
						this.props.onPageUpdate(applicationPage);
				}
		}

		renderApplicationFormErrorMessage(errorMessages = []) {
				return (
						<Message
								error
								size='small'
								className="error-message"
								header='Your application is invalid!'
								list={errorMessages}
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
																				this.handlePreviousPageUpdate(applicationPage - 1);
																		}}
								/>
						);
				}
				if (applicationPage >= 0 && applicationPage < numberOfPages - 1) {
						Buttons.push(
								<NextPageButton key="application-next-page-button"
																onClick={(e) => {
																		e.preventDefault();
																		this.handleNextPageUpdate(applicationPage + 1);
																}}
								/>
						);
				} else if (applicationPage === numberOfPages - 1) {
						Buttons.push(<SubmitButton key="application-submit-button"/>);
				}

				return (
						<Form onSubmit={this.props.handleSubmit}
									size="large"
									error={this.props.applicationError}
									loading={this.props.applicationLoading}>

								<FormProgress steps={FORM_STEPS}
															currentStepIndex={applicationPage}
															onNextStep={(e) => this.handleNextPageUpdate(Number(e.currentTarget.getAttribute('data-value')))}
															onPreviousStep={(e) => this.handlePreviousPageUpdate(Number(e.currentTarget.getAttribute('data-value')))}
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
								{this.renderApplicationFormErrorMessage(this.props.applicationFormErrorMessage)}
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
				applicationFormErrorMessage: getApplicationFormErrorMessages(state),
				syncErrors: getFormSyncErrors('apply')(state),
				values: getFormValues('apply')(state)
		};
}

ApplyForm = connect(mapStateToProps, { applicationFormErrorMessagesUpdate, applicationErrorUpdate })(ApplyForm);

export default reduxForm({
		form: 'apply',
		initialValues: {
				isCodeOfConductAccepted: true
		}
		// validate: validateForm
})(ApplyForm);
