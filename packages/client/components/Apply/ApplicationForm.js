import React, { Component } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import ApplicationAuthSlider from "./ApplicationAuthSlider";
import ActionButton from "../ActionButton/ActionButton";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import ValidationError from "../ValidationError/ValidationError";
import escapeStringRegexp from "escape-string-regexp";

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
    if (auth) {
      if (!this.state.authAnswers.hasOwnProperty(field)) {
        throw `No such field "${field}" in authentication form`;
      }
    } else {
      if (!this.state.applicationAnswers.hasOwnProperty(field)) {
        throw `No such field "${field}" in application form`;
      }
    }
    const validators = {
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
        message: "Please enter a valid date in the form YYYY-MM-DD"
      },
      program: {
        regex: /^[^0-9]+$/,
        stepNum: 1,
        message: "Please enter a valid program"
      },
      graduationYear: {
        regex: /^.+$/,
        stepNum: 1,
        message: "Please enter a valid year in the form YYYY"
      },
      whyQHacks: {
        regex: /^(.){0,2000}$/,
        stepNum: 2,
        message: "Please enter a valid answer (max 2000 chars)"
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
    this.setState({ returningHacker: i === 1, hasErrors: false });
  }

  toOptions(str) {
    return {
      label: str,
      value: str
    };
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

    const raceOptions = [
      "White",
      "South Asian",
      "Chinese",
      "Black",
      "Filipino",
      "Latin American",
      "Arab",
      "Southeast Asian",
      "West Asian",
      "Korean",
      "Japanese",
      "Aboriginal"
    ].map((str) => this.toOptions(str));

    const genderOptions = ["Male", "Female"].map((str) => this.toOptions(str));

    const schoolOptions = ["Queen's University", "University of Toronto"].map(
      (str) => this.toOptions(str)
    );

    const degreeOptions = [
      "Bachelor of Science",
      "Bachelor of Arts",
      "Bachelor of Engineering",
      "Bachelor of Computing"
    ].map((str) => this.toOptions(str));

    const monthOptions = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].map((str) => this.toOptions(str));

    switch (num) {
      default: {
        return (
          <div
            css={`
              ${formStyle}
              text-align: center;
            `}
          >
            <h3>
              {this.state.returningHacker
                ? "Welcome back!"
                : "Join the QHacks family!"}
            </h3>
            <ApplicationAuthSlider
              items={["new hacker", "returning hacker"]}
              changeSelected={(i) => this.changeSelected(i)}
              selectedItem={this.state.returningHacker ? 1 : 0}
            />
            {this.state.returningHacker ? (
              <div>
                <h2 css={authHeadingStyle}>Login to Account</h2>
                <div css={subsectionStyle}>
                  <div
                    css={`
                      width: 100%;
                    `}
                  >
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          placeholder="Email address"
                          value={this.state.authAnswers.email}
                          onChange={(e) =>
                            this.setAuthAnswer("email", e.target.value)
                          }
                        />
                        <ValidationError message={this.state.errors.email} />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Password"
                          value={this.state.authAnswers.password}
                          onChange={(e) =>
                            this.setAuthAnswer("password", e.target.value)
                          }
                        />
                        <ValidationError message={this.state.errors.password} />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <ActionButton
                          disabled={this.state.hasErrors}
                          style={`margin-top: 50px;`}
                          color="red"
                          onClick={() => this.nextStep()}
                        >
                          Login
                        </ActionButton>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 css={authHeadingStyle}>Create an Account</h2>
                <div css={subsectionStyle}>
                  <div
                    css={`
                      width: 100%;
                    `}
                  >
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          placeholder="First name"
                          key="firstName"
                          value={this.state.authAnswers.firstName}
                          onChange={(e) =>
                            this.setAuthAnswer("firstName", e.target.value)
                          }
                        />
                        <ValidationError
                          message={this.state.errors.firstName}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          key="lastName"
                          placeholder="Last name"
                          value={this.state.authAnswers.lastName}
                          onChange={(e) =>
                            this.setAuthAnswer("lastName", e.target.value)
                          }
                        />
                        <ValidationError message={this.state.errors.lastName} />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          key="email"
                          type="text"
                          placeholder="Email address"
                          value={this.state.authAnswers.email}
                          onChange={(e) =>
                            this.setAuthAnswer("email", e.target.value)
                          }
                        />
                        <ValidationError message={this.state.errors.email} />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          key="password"
                          type="password"
                          placeholder="Password"
                          value={this.state.authAnswers.password}
                          onChange={(e) =>
                            this.setAuthAnswer("password", e.target.value)
                          }
                        />
                        <ValidationError message={this.state.errors.password} />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="confirmPassword">
                          Confirm password
                        </label>
                        <input
                          id="confirmPassword"
                          key="confirmPassword"
                          placeholder="Confirm password"
                          type="password"
                          value={this.state.authAnswers.confirmPassword}
                          onChange={(e) =>
                            this.setAuthAnswer(
                              "confirmPassword",
                              e.target.value
                            )
                          }
                        />
                        <ValidationError
                          message={this.state.errors.confirmPassword}
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <ActionButton
                          disabled={this.state.hasErrors}
                          style={`margin-top: 50px;`}
                          color="red"
                          onClick={() => this.nextStep()}
                        >
                          Create Account
                        </ActionButton>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
      case 1: {
        return (
          <div css={formStyle}>
            <h2>Tell us about yourself</h2>
            <div css={subsectionStyle}>
              <div css={subsectionTitleStyles}>Personal Details</div>
              <div css={subsectionContentStyles}>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <CreatableSelect
                      options={genderOptions}
                      id="gender"
                      key="gender"
                      className="select"
                      value={this.getApplicationAnswerSelect("gender")}
                      onChange={this.setApplicationAnswerSelect("gender")}
                    />
                    <ValidationError message={this.state.errors.gender} />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      id="phoneNumber"
                      key="phoneNumber"
                      type="tel"
                      placeholder="Phone number"
                      value={this.state.applicationAnswers.phoneNumber}
                      onChange={(e) =>
                        this.setApplicationAnswer("phoneNumber", e.target.value)
                      }
                    />
                    <ValidationError message={this.state.errors.phoneNumber} />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      id="birthday"
                      key="birthday"
                      type="date"
                      value={this.state.applicationAnswers.birthday}
                      onChange={(e) =>
                        this.setApplicationAnswer("birthday", e.target.value)
                      }
                    />
                    <ValidationError message={this.state.errors.birthday} />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="race">Race</label>
                    <CreatableSelect
                      options={raceOptions}
                      id="race"
                      key="race"
                      className="select"
                      value={this.getApplicationAnswerSelect("race")}
                      onChange={this.setApplicationAnswerSelect("race")}
                    />
                    <ValidationError message={this.state.errors.race} />
                  </div>
                </section>
              </div>
            </div>
            <div css={subsectionStyle}>
              <div css={subsectionTitleStyles}>Education</div>
              <div css={subsectionContentStyles}>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="school">What school do you attend?</label>
                    <CreatableSelect
                      options={schoolOptions}
                      id="school"
                      key="school"
                      className="select"
                      value={this.getApplicationAnswerSelect("school")}
                      onChange={this.setApplicationAnswerSelect("school")}
                    />
                    <ValidationError message={this.state.errors.school} />
                  </div>
                  <div>
                    <label htmlFor="program">What is your program?</label>
                    <input
                      type="text"
                      id="program"
                      key="program"
                      placeholder="Program"
                      value={this.state.applicationAnswers.program}
                      onChange={(e) =>
                        this.setApplicationAnswer("program", e.target.value)
                      }
                    />
                    <ValidationError message={this.state.errors.program} />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="degree">Degree type</label>
                    <CreatableSelect
                      options={degreeOptions}
                      id="degree"
                      key="degree"
                      className="select"
                      value={this.getApplicationAnswerSelect("degree")}
                      onChange={this.setApplicationAnswerSelect("degree")}
                    />
                    <ValidationError message={this.state.errors.degree} />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="graduationMonth">Graduation date</label>
                    <Select
                      options={monthOptions}
                      id="graduationMonth"
                      key="graduationMonth"
                      className="select"
                      value={this.getApplicationAnswerSelect("graduationMonth")}
                      onChange={this.setApplicationAnswerSelect(
                        "graduationMonth"
                      )}
                    />
                    <ValidationError
                      message={this.state.errors.graduationMonth}
                    />
                  </div>
                  <div>
                    <input
                      id="graduationYear"
                      key="graduationYear"
                      placeholder="Year"
                      type="number"
                      value={this.state.applicationAnswers.graduationYear}
                      css={`
                        margin-top: 28px !important;
                      `}
                      onChange={(e) =>
                        this.setApplicationAnswer(
                          "graduationYear",
                          e.target.value
                        )
                      }
                    />
                    <ValidationError
                      message={this.state.errors.graduationYear}
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <ActionButton
                      disabled={this.state.hasErrors}
                      style={`margin-top: 50px; float: right;`}
                      color="red"
                      onClick={() => this.nextStep()}
                    >
                      Continue
                    </ActionButton>
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div css={formStyle}>
            <h2>Hackathon Information</h2>
            <div css={subsectionStyle}>
              <div
                css={`
                  width: 100%;
                `}
              >
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="whyQHacks">
                      Why do you want to attend QHacks?
                    </label>
                    <textarea
                      value={this.state.applicationAnswers.whyQHacks}
                      onChange={(e) =>
                        this.setApplicationAnswer("whyQHacks", e.target.value)
                      }
                    />
                    <ValidationError message={this.state.errors.whyQHacks} />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="numAttendedHackathons">
                      How many hackathons have you attended?
                    </label>
                    <input
                      type="number"
                      placeholder="#"
                      value={
                        this.state.applicationAnswers.numAttendedHackathons
                      }
                      css={`
                        max-width: 125px;
                      `}
                      onChange={(e) =>
                        this.setApplicationAnswer(
                          "numAttendedHackathons",
                          e.target.value
                        )
                      }
                    />
                    <ValidationError
                      message={this.state.errors.numAttendedHackathons}
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="fromLocation">
                      Where are you travelling from?
                    </label>
                    <input
                      type="text"
                      placeholder="Location"
                      value={this.state.applicationAnswers.fromLocation}
                      onChange={(e) =>
                        this.setApplicationAnswer(
                          "fromLocation",
                          e.target.value
                        )
                      }
                    />
                    <ValidationError message={this.state.errors.fromLocation} />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <ActionButton
                      style={`margin-top: 50px;`}
                      foregroundColor="black"
                      onClick={() => this.props.previousStep()}
                    >
                      Back
                    </ActionButton>{" "}
                    <ActionButton
                      disabled={this.state.hasErrors}
                      style={`margin-top: 50px;`}
                      color="red"
                      onClick={() => this.nextStep()}
                    >
                      Submit
                    </ActionButton>
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      }
      case 3: {
        const pStyle = `
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.36;
        `;
        return (
          <div
            css={`
              ${formStyle}
              text-align: center;
            `}
          >
            <img
              src={require("../../assets/img/3-gears.png")}
              css={`
                height: 133px;
                width: 240px;
              `}
            />
            <h2
              css={`
                margin: 32px 0;
              `}
            >
              Thank-you for Applying to QHacks 2019!
            </h2>
            <p css={pStyle}>
              The QHacks’s team is working hard to review your application
              carefully. We will be contacting you via email regarding the
              status of your application. So stay in tune!
            </p>
            <div
              css={`
                margin: 40px 0;
              `}
            >
              <ActionButton internal link="/dashboard" color="red">
                View Dashoard
              </ActionButton>
            </div>
            <p
              css={`
                ${pStyle}
                margin-bottom: 100px;
              `}
            >
              For more information regarding QHacks 2019, please visit our
              website at{" "}
              <a
                css={`
                  font-weight: 600;
                `}
                href="https://qhacks.io/"
              >
                qhacks.io
              </a>
            </p>
          </div>
        );
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
