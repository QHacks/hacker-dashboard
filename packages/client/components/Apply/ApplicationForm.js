import escapeStringRegexp from "escape-string-regexp";
import { graphql, compose } from "react-apollo";
import React, { Component } from "react";
import gql from "graphql-tag";
import axios from "axios";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { steel } from "../../assets/colors";
import { mobileMaxWidth } from "../../assets/constants";
import { SERVER_HOST } from "../../Client";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) @client
  }
`;

const SUBMIT_APPLICATION_MUTATION = gql`
  mutation CreateApplication($eventSlug: String!, $input: ApplicationInput!) {
    createApplication(eventSlug: $eventSlug, input: $input) {
      application {
        status
      }
    }
  }
`;

const UPDATE_HACKER_INFO_MUTATION = gql`
  mutation UpdateHackerInformation($input: HackerInput!) {
    hackerUpdate(input: $input) {
      hacker {
        firstName
      }
    }
  }
`;

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
        numberOfHackathons: "",
        travelOrigin: "",
        gender: "",
        race: "",
        school: "",
        degree: "",
        graduationMonth: "",
        whyQhacks: "",
        passionProject: "",
        agreeMlhCodeConduct: "",
        agreeMlhTosAndPrivacyPolicy: "",
        githubLink: "",
        linkedinLink: "",
        personalWebsite: ""
      },
      errors: {},
      hasErrors: false,
      alert: {
        type: "",
        status: null,
        message: ""
      },
      alertShown: false
    };

    this.setApplicationAnswer = this.setApplicationAnswer.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.setAuthAnswer = this.setAuthAnswer.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.resetConfirmPassword = this.resetConfirmPassword.bind(this);
    this.submit = this.submit.bind(this);
    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  showAlert(message, type, status = null) {
    this.setState({
      alert: {
        message,
        type,
        status
      },
      alertShown: true
    });

    setTimeout(() => this.setState({ alertShown: false }), 6000);
  }

  async login() {
    if (this.validateAllAnswers()) {
      const { email, password } = this.state.authAnswers;

      try {
        const response = await axios.post(`${SERVER_HOST}/oauth/session`, {
          email,
          password,
          grantType: "password"
        });

        this.props.login({
          variables: {
            input: {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken
            }
          }
        });

        this.nextStep();
      } catch (err) {
        this.showAlert(err.response.data.message, "danger");
      }
    }
  }

  async createAccount() {
    if (this.validateAllAnswers()) {
      const { firstName, lastName, email, password } = this.state.authAnswers;

      try {
        const response = await axios.post(`${SERVER_HOST}/oauth/signup`, {
          firstName,
          lastName,
          email,
          password
        });

        this.props.login({
          variables: {
            input: {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken
            }
          }
        });

        this.nextStep();
      } catch (err) {
        this.showAlert(err.response.data.message, "danger");
      }
    }
  }

  async submit() {
    if (this.validateAllAnswers()) {
      const answers = this.state.applicationAnswers;
      const dontInclude = [
        "agreeMlhCodeConduct",
        "agreeMlhTosAndPrivacyPolicy"
      ];
      const responses = Object.keys(answers)
        .map((label) => ({
          label: label,
          answer: answers[label]
        }))
        .filter((item) => !dontInclude.includes(item.label));

      try {
        await this.props.submitApplication({
          variables: {
            eventSlug: "qhacks-2019",
            input: {
              responses
            }
          }
        });

        const newHackerInfo = {
          phoneNumber: this.state.applicationAnswers.phoneNumber,
          personalWebsiteLink: this.state.applicationAnswers.personalWebsite,
          githubLink: this.state.applicationAnswers.githubLink,
          linkedinLink: this.state.applicationAnswers.linkedinLink,
          schoolName: this.state.applicationAnswers.school
        };

        if (!newHackerInfo.githubLink) delete newHackerInfo.githubLink;
        if (!newHackerInfo.linkedinLink) delete newHackerInfo.linkedinLink;
        if (!newHackerInfo.personalWebsite) {
          delete newHackerInfo.personalWebsite;
        }
        await this.props.updateHacker({
          variables: {
            input: {
              ...newHackerInfo
            }
          }
        });

        this.nextStep();
      } catch (err) {
        this.showAlert("Could not submit application at this time!", "danger");
      }
    }
  }

  nextStep() {
    if (this.validateAllAnswers()) {
      this.setState({
        alertShown: false,
        alert: {
          type: "",
          status: null,
          message: ""
        }
      });

      this.props.nextStep();
    }
  }

  previousStep() {
    this.props.previousStep();
  }

  validators() {
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
        regex: new RegExp(
          `^${escapeStringRegexp(this.state.authAnswers.password)}$`
        ),
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
      gender: {
        regex: /^[^0-9]+$/,
        stepNum: 1,
        message: "Please enter your gender"
      },
      phoneNumber: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter a valid phone number"
      },
      birthday: {
        regex: /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/,
        stepNum: 1,
        message: "Please enter a valid date in the form YYYY-MM-DD"
      },
      race: {
        regex: /^[^0-9]+$/,
        stepNum: 1,
        message: "Please enter your race"
      },
      linkedinLink: {
        regex: /^.*$/,
        stepNum: 1,
        message: "Please enter a valid URL"
      },
      githubLink: {
        regex: /^.*$/,
        stepNum: 1,
        message: "Please enter a valid URL"
      },
      personalWebsite: {
        regex: /^.*$/,
        stepNum: 1,
        message: "Please enter a valid URL"
      },
      school: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter your school"
      },
      program: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter a valid program"
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
      },
      graduationYear: {
        regex: /^[0-9]{4}$/,
        stepNum: 1,
        message: "Please enter a valid year in the form YYYY"
      },
      whyQhacks: {
        regex: /^\s*[-\w]+(?:\W+[-\w]+){0,300}\W*\s*$/,
        stepNum: 2,
        message: "Please enter a valid answer (max 300 words)"
      },
      passionProject: {
        regex: /^\s*[-\w]+(?:\W+[-\w]+){0,300}\W*\s*$/,
        stepNum: 2,
        message: "Please enter a valid answer (max 300 words)"
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
      numberOfHackathons: {
        regex: /^[0-9]+$/,
        stepNum: 2,
        message: "Please enter a valid number"
      },
      travelOrigin: {
        regex: /^.+$/,
        stepNum: 2,
        message: "Please enter a valid location"
      }
    };
  }

  validApplicationField(field) {
    return Object.prototype.hasOwnProperty.call(
      this.state.applicationAnswers,
      field
    );
  }

  validAuthField(field) {
    return Object.prototype.hasOwnProperty.call(this.state.authAnswers, field);
  }

  setAuthAnswer(field, answer) {
    if (!this.validAuthField(field)) {
      throw new Error(`No such field "${field}" in sign up form`);
    }
    const { authAnswers } = this.state;
    authAnswers[field] = answer;
    this.validateAnswer(field, answer, true);
    this.setState({ authAnswers });
  }

  setApplicationAnswer(field, answer) {
    if (!this.validApplicationField(field)) {
      throw new Error(`No such field "${field}" in application form`);
    }
    const { applicationAnswers } = this.state;
    applicationAnswers[field] = answer;
    this.validateAnswer(field, answer);
    this.setState({ applicationAnswers });
  }

  setError(field, err, auth = false) {
    if (auth) {
      if (!this.validAuthField(field)) {
        throw new Error(`No such field "${field} in authentication form`);
      }
    } else if (!this.validApplicationField(field)) {
      throw new Error(`No such field "${field} in application form`);
    }
    const { errors } = this.state;
    errors[field] = err;

    const hasErrors = Object.keys(errors).some((key) => errors[key]);

    this.setState({ errors, hasErrors });
  }

  validateAllAnswers() {
    let valid = true;

    Object.keys(this.state.applicationAnswers).forEach((field) => {
      valid =
        this.validateAnswer(field, this.state.applicationAnswers[field]) &&
        valid;
    });

    Object.keys(this.state.authAnswers).forEach((field) => {
      valid =
        this.validateAnswer(field, this.state.authAnswers[field], true) &&
        valid;
    });

    return valid;
  }

  validateAnswer(field, inAnswer, auth = false) {
    const validators = this.validators();
    const answer = String(inAnswer);
    if (auth) {
      if (!this.validAuthField(field)) {
        throw new Error(`No such field "${field}" in authentication form`);
      }
    } else if (!this.validApplicationField(field)) {
      throw new Error(`No such field "${field}" in application form`);
    }

    if (this.state.returningHacker && validators[field].forSignUp) {
      this.setError(field, "", auth);
      return true;
    }

    if (
      this.props.stepNum !== validators[field].stepNum ||
      validators[field].regex.test(answer)
    ) {
      this.setError(field, "", auth);
      return true;
    }

    this.setError(field, validators[field].message, auth);
    return false;
  }

  changeSelected(i) {
    const { errors } = this.state;
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
      @media (max-width: ${mobileMaxWidth}) {
        display: none;
      }
    `;

    const subsectionContentStyles = `
      width: 70%;
      @media (max-width: ${mobileMaxWidth}) {
        width: 100%;
      }
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
            alert={this.state.alert}
            alertShown={this.state.alertShown}
            returningHacker={this.state.returningHacker}
            changeSelected={this.changeSelected}
            authAnswers={this.state.authAnswers}
            setAuthAnswer={this.setAuthAnswer}
            errors={this.state.errors}
            hasErrors={this.state.hasErrors}
            nextStep={this.nextStep}
            resetConfirmPassword={this.resetConfirmPassword}
            login={this.login}
            createAccount={this.createAccount}
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
            alert={this.state.alert}
            alertShown={this.state.alertShown}
            setApplicationAnswer={this.setApplicationAnswer}
            applicationAnswers={this.state.applicationAnswers}
            errors={this.state.errors}
            hasErrors={this.state.hasErrors}
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

export default compose(
  graphql(LOGIN_MUTATION, {
    name: "login"
  }),
  graphql(SUBMIT_APPLICATION_MUTATION, {
    name: "submitApplication"
  }),
  graphql(UPDATE_HACKER_INFO_MUTATION, {
    name: "updateHacker"
  })
)(ApplicationForm);
