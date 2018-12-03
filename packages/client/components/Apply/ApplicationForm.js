import React, { Component } from "react";
import escapeStringRegexp from "escape-string-regexp";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { steel } from "../../assets/colors";

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
        // if you modify this, remember to update the validators
        phoneNumber: "",
        birthday: "",
        program: "",
        graduationYear: "",
        numAttendedHackathons: "",
        fromLocation: "",
        gender: "",
        race: "",
        school: "",
        degree: "",
        graduationMonth: "",
        whyApply: "",
        dreamProject: "",
        passionProject: "",
        agreeMlhCodeConduct: "",
        agreeMlhTosAndPrivacyPolicy: ""
      },
      errors: {},
      hasErrors: false
    };

    this.changeSelected = this.changeSelected.bind(this);
    this.setAuthAnswer = this.setAuthAnswer.bind(this);
    this.setApplicationAnswer = this.setApplicationAnswer.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.resetConfirmPassword = this.resetConfirmPassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  validators(authAnswers) {
    return {
      email: {
        regex: /^.+@.+$/,
        stepNum: 0,
        message: "Please enter a valid email"
      },
      password: {
        regex: /^.{8,}$/,
        stepNum: 0,
        message: "Please enter a valid password (at least 8 characters)"
      },
      confirmPassword: {
        regex: new RegExp(`^${escapeStringRegexp(authAnswers.password)}$`),
        stepNum: 0,
        forSignUp: true,
        message: "Please make sure your passwords match"
      },
      firstName: {
        regex: /^[^0-9]+$/,
        stepNum: 0,
        forSignUp: true,
        message: "Please enter a valid first name"
      },
      lastName: {
        regex: /^[^0-9]+$/,
        stepNum: 0,
        forSignUp: true,
        message: "Please enter a valid last name"
      },
      phoneNumber: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter a valid phone number"
      },
      birthday: {
        regex: /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/,
        stepNum: 1,
        message: "Please enter a valid date"
      },
      program: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter a valid program"
      },
      graduationYear: {
        regex: /^[0-9]{4}$/,
        stepNum: 1,
        message: "Please enter a valid year in the form YYYY"
      },
      whyApply: {
        regex: /^\s*[-\w]+(?:\W+[-\w]+){0,300}\W*\s*$/,
        stepNum: 2,
        message: "Please enter a valid answer (max 300 words)"
      },
      passionProject: {
        regex: /^\s*[-\w]+(?:\W+[-\w]+){0,300}\W*\s*$/,
        stepNum: 2,
        message: "Please enter a valid answer (max 300 words)"
      },
      dreamProject: {
        regex: /^\s*[-\w]+(?:\W+[-\w]+){0,100}\W*\s*$/,
        stepNum: 2,
        message: "Please enter a valid answer (max 100 words)"
      },
      agreeMlhTosAndPrivacyPolicy: {
        regex: /^true$/,
        stepNum: 2,
        message:
          "Please accept MLH's terms of service and privacy policy to apply"
      },
      agreeMlhCodeConduct: {
        regex: /^true$/,
        stepNum: 2,
        message: "Please accept MLH's code of conduct to apply"
      },
      numAttendedHackathons: {
        regex: /^[0-9]+$/,
        stepNum: 2,
        message: "Please enter a valid number"
      },
      fromLocation: {
        regex: /^.+$/,
        stepNum: 2,
        message: "Please enter a valid location"
      },
      gender: {
        regex: /^[^0-9]+$/,
        stepNum: 1,
        message: "Please enter your gender"
      },
      race: {
        regex: /^[^0-9]+$/,
        stepNum: 1,
        message: "Please enter your race"
      },
      school: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter your school"
      },
      degree: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter your degree"
      },
      graduationMonth: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter a valid month"
      }
    };
  }

  submit() {
    const answers = this.state.applicationAnswers;
    // send request
    this.props.nextStep();
  }

  setAuthAnswer(field, answer) {
    if (!this.state.authAnswers.hasOwnProperty(field)) {
      throw `No such field "${field}" in sign up form`;
    }
    const authAnswers = this.state.authAnswers;
    authAnswers[field] = answer;
    this.validateAnswer(field, answer, true);
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
    } else if (!this.state.applicationAnswers.hasOwnProperty(field)) {
      throw `No such field "${field} in application form`;
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

  previousStep() {
    this.props.previousStep();
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
    const validators = this.validators(this.state.authAnswers);
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

    if (this.state.returningHacker && validators[field].forSignUp) {
      this.setError(field, "", auth);
      return true;
    }
    if (
      this.props.stepNum != validators[field].stepNum ||
      validators[field].regex.test(answer)
    ) {
      this.setError(field, "", auth);
      return true;
    } else {
      this.setError(field, validators[field].message, auth);
      return false;
    }
  }

  changeSelected(i) {
    const errors = this.state.errors;
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
    this.setState({ returningHacker: i === 1, hasErrors: false, errors });
  }

  resetConfirmPassword() {
    const { authAnswers, errors } = this.state;
    authAnswers.confirmPassword = "";
    errors.confirmPassword = "";
    this.setState({ authAnswers, errors });
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
        border-bottom: 2px solid ${steel};
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
            resetConfirmPassword={this.resetConfirmPassword}
            {...allStyles}
          />
        );
      }
      case 1: {
        return (
          <Step2
            setApplicationAnswer={this.setApplicationAnswer}
            applicationAnswers={this.state.applicationAnswers}
            errors={this.state.errors}
            hasErrors={this.state.hasErrors}
            nextStep={this.nextStep}
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
            previousStep={this.previousStep}
            submit={this.submit}
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
