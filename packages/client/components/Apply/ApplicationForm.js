import React, { Component } from "react";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { validators } from "../../assets/constants";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returningHacker: false,
      authAnswers: {
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: ""
      },
      applicationAnswers: {
        phoneNumber: "",
        birthday: "",
        program: "",
        graduationYear: "",
        whyQHacks: "",
        numAttendedHackathons: "",
        fromLocation: "",
        gender: "",
        race: "",
        school: "",
        degree: "",
        graduationMonth: ""
      },
      errors: {},
      hasErrors: false
    };

    // this.doSomething = this.doSomething.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.setAuthAnswer = this.setAuthAnswer.bind(this);
    this.setApplicationAnswer = this.setApplicationAnswer.bind(this);
    this.getApplicationAnswerSelect = this.getApplicationAnswerSelect.bind(
      this
    );
    this.setApplicationAnswerSelect = this.setApplicationAnswerSelect.bind(
      this
    );
    this.nextStep = this.nextStep.bind(this);
    this.toOptions = this.toOptions.bind(this);
  }

  setAuthAnswer(field, answer) {
    if (!this.state.authAnswers.hasOwnProperty(field)) {
      throw `No such field "${field}" in sign up form`;
    }
    const authAnswers = this.state.authAnswers;
    authAnswers[field] = answer;
    this.validateAnswer(field, answer, true);
    console.log(authAnswers);
    this.setState({ authAnswers });
  }

  setApplicationAnswer(field, answer) {
    answer = answer;
    if (!this.state.applicationAnswers.hasOwnProperty(field)) {
      throw `No such field "${field}" in application form`;
    }
    const applicationAnswers = this.state.applicationAnswers;
    applicationAnswers[field] = answer;
    this.validateAnswer(field, answer);
    this.setState({ applicationAnswers });
  }

  setError(field, err, auth = false) {
    if (auth) {
      if (!this.state.authAnswers.hasOwnProperty(field)) {
        throw `No such field "${field} in authentication form`;
      }
    } else {
      if (!this.state.applicationAnswers.hasOwnProperty(field)) {
        throw `No such field "${field} in application form`;
      }
    }
    const errors = this.state.errors;
    errors[field] = err;
    let hasErrors = false;
    for (var property in errors) {
      if (errors.hasOwnProperty(property) && errors[property]) {
        hasErrors = true;
      }
    }
    this.setState({ errors, hasErrors });
  }

  nextStep() {
    if (this.validateAllAnswers()) {
      this.props.nextStep();
    }
  }

  validateAllAnswers() {
    let valid = true;
    for (var field in this.state.applicationAnswers) {
      if (this.state.applicationAnswers.hasOwnProperty(field)) {
        valid &= this.validateAnswer(
          field,
          this.state.applicationAnswers[field]
        );
      }
    }
    for (var field in this.state.authAnswers) {
      if (this.state.authAnswers.hasOwnProperty(field)) {
        valid &= this.validateAnswer(
          field,
          this.state.authAnswers[field],
          true
        );
      }
    }
    return valid;
  }

  validateAnswer(field, answer, auth = false) {
    const validator = validators(this.state.authAnswers);
    answer = String(answer);
    if (auth) {
      if (!this.state.authAnswers.hasOwnProperty(field)) {
        throw `No such field "${field}" in authentication form`;
      }
    } else {
      if (!this.state.applicationAnswers.hasOwnProperty(field)) {
        throw `No such field "${field}" in application form`;
      }
    }

    if (this.state.returningHacker && validator[field].forSignUp) {
      this.setError(field, "", auth);
      return true;
    }
    if (
      this.props.stepNum != validator[field].stepNum ||
      validator[field].regex.test(answer)
    ) {
      this.setError(field, "", auth);
      return true;
    } else {
      this.setError(field, validator[field].message, auth);
      return false;
    }
  }

  setApplicationAnswerSelect(field) {
    return (answer) => this.setApplicationAnswer(field, answer.value);
  }

  getApplicationAnswerSelect(field) {
    const val = this.state.applicationAnswers[field];
    return {
      label: val,
      value: val
    };
  }

  changeSelected(i) {
    const errors = this.state.errors;
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
    this.setState({ returningHacker: i === 1, hasErrors: false, errors });
  }

  getQuestions(num) {
    const formStyle = `
      padding-top: 64px;
      max-width: 800px;
      margin: 0 auto;
    `;

    const subsectionStyle = `
      display: flex;
      margin: 36px 0;
      :not(:last-child) {
        border-bottom: 2px solid #dddddd;
      }
      padding-bottom: 64px;
    `;

    const subsectionTitleStyles = `
      width: 30%;
      color: #575757;
      padding-top: 24px;
      font-weight: 600;
      text-transform: uppercase;
    `;

    const subsectionContentStyles = `
      width: 70%;
    `;

    const inputRowStyle = `
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-top:12px;
      align-items: stretch;
      label, input {
          display: block;
      }
      >div{
          flex-grow: 1;
          min-width: 50%;
          padding: 4px;
      }
    `;

    const authHeadingStyle = `
      font-size: 32px;
      margin-top: 45px !important;
      margin-bottom: -20px !important;
    `;

    const allStyles = {
      authHeadingStyle,
      subsectionStyle,
      inputRowStyle,
      formStyle,
      subsectionContentStyles,
      subsectionTitleStyles
    };

    switch (num) {
      default: {
        return (
          <Step1
            returningHacker={this.state.returningHacker}
            changeSelected={this.changeSelected}
            authAnswers={this.state.authAnswers}
            setAuthAnswer={this.setAuthAnswer}
            setApplicationAnswer={this.setApplicationAnswer}
            errors={this.state.errors}
            hasErrors={this.state.hasErrors}
            nextStep={this.nextStep}
            {...allStyles}
          />
        );
      }
      case 1: {
        return (
          <Step2
            setApplicationAnswer={this.setApplicationAnswer}
            getApplicationAnswerSelect={this.getApplicationAnswerSelect}
            setApplicationAnswerSelect={this.setApplicationAnswerSelect}
            applicationAnswers={this.state.applicationAnswers}
            errors={this.state.errors}
            hasErrors={this.state.hasErrors}
            nextStep={this.nextStep}
            toOptions={this.toOptions}
            {...allStyles}
          />
        );
      }
      case 2: {
        return (
          <Step3
            setApplicationAnswer={this.setApplicationAnswer}
            applicationAnswers={this.state.applicationAnswers}
            errors={this.state.errors}
            hasErrors={this.state.hasErrors}
            nextStep={this.nextStep}
            {...allStyles}
          />
        );
      }
      case 3: {
        return <Step4 {...allStyles} />;
      }
    }
  }
  render() {
    return (
      <ContentWrapper>{this.getQuestions(this.props.stepNum)}</ContentWrapper>
    );
  }
}

export default ApplicationForm;
