import { Button, Form, Segment, Transition, Message } from 'semantic-ui-react';
import { actionCreators, selectors } from '../../HackerStore';
import semanticFormField from './semanticFormField';
import { validationHelpers } from './validation';
import { Field, reduxForm } from 'redux-form';
import mlhSchools from './mlhSchools.json';
import FormProgress from './FormProgress';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ApplyForm.less';

const { required, validateEmail, validatePhoneNumber, validateBirthDate } = validationHelpers;
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
				component={semanticFormField}
				as={Form.Input}
				type="text"
				label="First Name"
				placeholder="Morty"
				validate={required}
			/>

			<Field name="lastName"
				component={semanticFormField}
				as={Form.Input}
				type="text"
				label="Last Name"
				placeholder="Smith"
				validate={required}
			/>

			<Field name="email"
				component={semanticFormField}
				as={Form.Input}
				type="email"
				label="Email Address"
				placeholder="morty.smith@example.com"
				validate={[required, validateEmail]}
			/>

			<Field name="phoneNumber"
				component={semanticFormField}
				as={Form.Input}
				type="tel"
				label="Phone Number"
				placeholder="+1 (234) 567-8900"
				validate={[required, validatePhoneNumber]}
			/>

			<Field name="dateOfBirth"
				component={semanticFormField}
				as={Form.Input}
				type="date"
				label="Date of Birth"
				validate={[ required, validateBirthDate ]}
			/>

			<Field name="gender"
				component={semanticFormField}
				as={Form.Select}
				label="What gender do you identify with?"
				options={GENDERS.map(mapValueForSelect)}
				placeholder='Female'
				validate={required}
				search={true}
			/>

			<Field name="password"
				component={semanticFormField}
				as={Form.Input}
				type="password"
				label="Password"
				placeholder='Password'
				validate={required}
			/>

			<Field name="confirmPassword"
				component={semanticFormField}
				as={Form.Input}
				type="password"
				label="Confirm Password"
				placeholder='Confirm Password'
				validate={required}
			/>
		</Segment>
	);
}

function PageTwo(props) {
	return (
		<Segment className={props.className}>
			<Field name="school"
				component={semanticFormField}
				as={Form.Select}
				label="School"
				options={mlhSchools.map(mapValueForSelect)}
				placeholder="Queen's University"
				validate={required}
				search={true}
			/>

			<Field name="degreeType"
				component={semanticFormField}
				as={Form.Select}
				label="Degree Type"
				options={DEGREE_TYPES.map(mapValueForSelect)}
				placeholder="Bachelor's degree"
				validate={required}
				search={true}
			/>

			<Field name="program"
				component={semanticFormField}
				as={Form.Input}
				type="text"
				label="Program"
				placeholder='Computer Science'
				validate={required}
			/>

			<Field name="graduationYear"
				component={semanticFormField}
				as={Form.Input}
				type="number"
				label="Graduation year"
				placeholder='2018'
				validate={required}
			/>

			<Field name="graduationMonth"
				component={semanticFormField}
				as={Form.Select}
				label="Graduation Month"
				options={MONTHS_IN_A_YEAR.map(mapValueForSelect)}
				placeholder="January"
				validate={required}
				search={true}
			/>

			<Field name="travelOrigin"
				component={semanticFormField}
				as={Form.Input}
				type="text"
				label="Where will you be travelling from?"
				placeholder='Kingston, ON'
				validate={required}
			/>
		</Segment>
	);
}

function PageThree(props) {
	return (
		<Segment className={props.className}>
			<Field name="numberOfHackathons"
				component={semanticFormField}
				as={Form.Select}
				label="How many hackathons have you attended?"
				options={NUMBER_OF_HACKATHONS.map(mapValueForSelect)}
				placeholder="#"
				validate={required}
				search={true}
			/>

			<Field name="whyQhacks"
				component={semanticFormField}
				as={Form.TextArea}
				label="Why do you want to come to QHacks 2018? (250 words max)"
				validate={required}
			/>

			<Field name="links"
				component={semanticFormField}
				as={Form.TextArea}
				label="Where can we find you online? e.g. GitHub, LinkedIn, etc."
				validate={required}
			/>

			<p>By applying you agree to adhere to <a target="_blank" rel="noopener noreferrer" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
			MLH's Code of Conduct</a>.</p>
			{/*<Field name="isCodeOfConductAccepted"
				component={semanticFormField}
				as={Form.Checkbox}
				label={
					<label>
						I have read and agree to adhere to <a target="_blank" rel="noopener noreferrer" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
						MLHs Code of Conduct</a>.
					</label>
				}
				validate={checkboxRequired}
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
			floated="right"
			type="button"
			onClick={props.onClick}
		/>
	);
}

function SubmitButton() {
	return (
		<Button type="submit"
			content="Apply"
			floated="right"
			primary
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
			<Form onSubmit={this.props.handleSubmit} size="large" error={this.props.applicationError} loading={this.props.applicationLoading}>

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
					{Buttons}
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
