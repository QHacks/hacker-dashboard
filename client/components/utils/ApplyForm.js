import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react';
import mlhSchools from './mlhSchools.json';
import { actionCreators, selectors } from '../../HackerStore';
import { Input, Select } from '../ReduxSemanticForm';
import './ApplyForm.less';

const { applicationPageUpdate } = actionCreators;

const DEGREE_TYPES = [
    'Bachelor\'s degree',
    'Master\'s degree',
    'Ph.D.',
    'High School',
    'Other'
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
                   component={Input}
                   props={{
                       label: 'First Name',
                       placeholder: 'Morty',
                       type: 'text'
                   }}/>
            <Field name="lastName"
                   component={Input}
                   props={{
                       label: 'Last Name',
                       placeholder: 'Smith',
                       type: 'text'
                   }}/>
            <Field name="email"
                   component={Input}
                   props={{
                       label: 'Email',
                       placeholder: 'morty.smith@example.com',
                       type: 'email'
                   }}/>
            <Field name="phoneNumber"
                   component={Input}
                   props={{
                       label: 'Phone Number',
                       placeholder: '+1 (234) 567-8900',
                       type: 'tel'
                   }}/>
            <div className="field">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <Field name="dateOfBirth"
                       component={Input}
                       props={{
                           type: 'date'
                       }}/>
            </div>
            <div className="field">
                <label htmlFor="gender">What gender do you identify with?</label>
                <Field name="gender"
                       component={Select}
                       props={{
                           placeholder: 'Female',
                           options: GENDERS.map(mapValueForSelect),
                           search: true
                       }}/>
            </div>
            <Field name="password"
                   component={Input}
                   props={{
                       label: 'Password',
                       placeholder: 'Password',
                       type: 'password'
                   }}/>
            <Field name="confirmPassword"
                   component={Input}
                   props={{
                       label: 'Confirm Password',
                       placeholder: 'Confirm Password',
                       type: 'password'
                   }}/>
        </Segment>
    );
}

function PageTwo(props) {
    return (
        <Segment className={props.className}>
            <div className="field">
                <label htmlFor="school">School</label>
                <Field name="school"
                       component={Select}
                       props={{
                           options: mlhSchools.map(mapValueForSelect),
                           placeholder: 'Queen\'s University',
                           search: true
                       }}/>
            </div>
            <div className="field">
                <label htmlFor="degreeType">Degree Type</label>
                <Field name="degreeType"
                       component={Select}
                       props={{
                           options: DEGREE_TYPES.map(mapValueForSelect),
                           placeholder: 'Bachelor\'s degree',
                           search: true
                       }}/>
            </div>
            <Field name="program"
                   component={Input}
                   props={{
                       label: 'Program',
                       placeholder: 'Computer Science',
                       type: 'text'
                   }}/>
            <Field name="graduationYear"
                   component={Input}
                   props={{
                       label: 'Graduation year',
                       placeholder: '2018',
                       type: 'number'
                   }}/>
            <div className="field">
                <label htmlFor="graduationMonth">Graduation Month</label>
                <Field name="graduationMonth"
                       component={Select}
                       props={{
                           placeholder: "January",
                           options: MONTHS_IN_A_YEAR.map(mapValueForSelect),
                           search: true
                       }}/>
            </div>
            <Field name="travelOrigin"
                   component={Input}
                   props={{
                       label: 'Where will you be travelling from?',
                       placeholder: 'Kingston, ON',
                       type: 'text'
                   }}/>
        </Segment>
    );
}

function PageThree(props) {
    return (
        <Segment className={props.className}>
            <div className="field">
                <label htmlFor="numberOfHackathons">How many hackathons have you attended?</label>
                <Field name="numberOfHackathons"
                       component={Select}
                       props={{
                           placeholder: '#',
                           options: NUMBER_OF_HACKATHONS.map(mapValueForSelect)
                       }}/>
            </div>
            <div className="field">
                <label htmlFor="whyQhacks">Why do you want to come to QHacks 2018? (250 words max)</label>
                <Field name="whyQhacks"
                       component="textarea"/>
            </div>
            <div className="field">
                <label htmlFor="links">Where can we find you online? e.g. GitHub, LinkedIn, etc.</label>
                <Field name="links"
                       component="textarea"/>
            </div>

            <div className="ui checkbox">
                <Field name="isCodeOfConductAccepted"
                       component="input"
                       type="checkbox"/>
                <label>
                    I have read and agree to adhere to <a target="_blank" rel="noopener noreferrer"
                                                          href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
                    MLH's Code of Conduct</a>.
                </label>
            </div>
            {/*<Checkbox label={{*/}
            {/*children: (*/}
            {/*<span>*/}
            {/*I have read and agree to adhere to <a target="_blank" rel="noopener noreferrer"*/}
            {/*href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH's Code of Conduct</a>.*/}
            {/*</span>*/}
            {/*)*/}
            {/*}}/>*/}
        </Segment>
    );
}

const Pages = {
    1: (props) => <PageOne {...props}/>,
    2: (props) => <PageTwo {...props}/>,
    3: (props) => <PageThree {...props}/>
};

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
                onClick={props.onClick}/>
    );
}

function NextPageButton(props) {
    return (
        <Button content="Next"
                icon="right arrow"
                labelPosition="right"
                onClick={props.onClick}/>
    );
}

function SubmitButton() {
    return (
        <Button type="submit"
                content="apply"
                primary/>
    );

}

class ApplyForm extends Component {
    handlePageUpdate(applicationPage) {
        const { applicationPageUpdate } = this.props;
        applicationPageUpdate({ applicationPage });
    }

    render() {
        const { applicationPage } = this.props;
        const Buttons = [];

        if (applicationPage > 1 && applicationPage <= Object.keys(Pages).length) {
            Buttons.push(
                <PreviousPageButton onClick={(e) => {
                    e.preventDefault();
                    this.handlePageUpdate(applicationPage - 1);
                }}/>
            );
        }
        if (applicationPage >= 1 && applicationPage < Object.keys(Pages).length) {
            Buttons.push(
                <NextPageButton onClick={(e) => {
                    e.preventDefault();
                    this.handlePageUpdate(applicationPage + 1);
                }}/>
            );
        } else if (applicationPage === Object.keys(Pages).length) {
            Buttons.push(<SubmitButton/>);
        }

        return (
            <Form onSubmit={this.props.handleSubmit}
                  size="large">
                {Object.values(Pages).map((Page, index) => {
                    return <Page className={index + 1 !== applicationPage ? 'hidden' : ''}/>;
                })}
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

export default reduxForm({ form: 'apply' })(ApplyForm);