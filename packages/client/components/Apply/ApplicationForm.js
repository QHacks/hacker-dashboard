import React, { PureComponent } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import ApplicationAuthSlider from "./ApplicationAuthSlider";
import ActionButton from "../ActionButton/ActionButton";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

class ApplicationForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      returningHacker: false,
      answers: {}
    };
  }

  setAnswer(field, answer) {
    const answers = this.state.answers;
    answers[field] = answer;
    this.setState({ answers });
  }

  setAnswerSelect(field) {
    return (answer) => {
      if (Array.isArray(answer)) {
        this.setAnswer(field, answer.map((ans) => ans.value));
      } else {
        this.setAnswer(field, answer.value);
      }
    };
  }

  changeSelected(i) {
    this.setState({ returningHacker: i === 1 });
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
    `;

    const subsectionStyle = `
      display: flex;
      margin: 36px 0;
    `;

    const subsectionTitleStyles = `
      width: 30%;
      color: #575757;
      padding-top: 24px;
      font-weight: bold;
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

    const authHeadingStyle = `margin-top: 45px !important; margin-bottom: -20px !important;`;

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
                      className="select"
                      onChange={this.setAnswerSelect("gender")}
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={this.state.answers.phoneNumber}
                      onChange={(e) =>
                        this.setAnswer("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      id="birthday"
                      type="date"
                      value={this.state.answers.birthday}
                      onChange={(e) =>
                        this.setAnswer("birthday", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="race">Race</label>
                    <CreatableSelect
                      isMulti
                      options={raceOptions}
                      id="race"
                      className="select"
                      onChange={this.setAnswerSelect("race")}
                    />
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
                      className="select"
                      onChange={this.setAnswerSelect("school")}
                    />
                  </div>
                  <div>
                    <label htmlFor="program">What is your program?</label>
                    <input
                      type="text"
                      id="program"
                      value={this.state.answers.program}
                      onChange={(e) =>
                        this.setAnswer("program", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="degree">Degree type</label>
                    <CreatableSelect
                      options={degreeOptions}
                      id="degree"
                      className="select"
                      onChange={this.setAnswerSelect("degree")}
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="graduationMonth">Graduation date</label>
                    <Select
                      options={monthOptions}
                      id="graduationMonth"
                      className="select"
                      onChange={this.setAnswerSelect("graduationMonth")}
                    />
                  </div>
                  <div>
                    <input
                      id="graduationYear"
                      type="number"
                      value={this.state.graduationYear}
                      css={`
                        margin-top: 31px !important;
                      `}
                      onChange={(e) =>
                        this.setAnswer("graduationYear", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <ActionButton
                      style={`margin-top: 50px;`}
                      onClick={() => this.props.previousPage()}
                    >
                      Previous
                    </ActionButton>{" "}
                    <ActionButton
                      style={`margin-top: 50px;`}
                      color="red"
                      onClick={() => this.props.nextPage()}
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
                      value={this.state.answers.whyQHacks}
                      onChange={(e) =>
                        this.setAnswer("whyQHacks", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <label htmlFor="numAttendedHackathons">
                      How many hackathons have you attended?
                    </label>
                    <input
                      type="number"
                      value={this.state.answers.numAttendedHackathons}
                      onChange={(e) =>
                        this.setAnswer("numAttendedHackathons", e.target.value)
                      }
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
                      value={this.state.answers.fromLocation}
                      onChange={(e) =>
                        this.setAnswer("fromLocation", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section css={inputRowStyle}>
                  <div>
                    <ActionButton
                      style={`margin-top: 50px;`}
                      onClick={() => this.props.previousPage()}
                    >
                      Previous
                    </ActionButton>{" "}
                    <ActionButton
                      style={`margin-top: 50px;`}
                      color="red"
                      onClick={() => this.props.nextPage()}
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
        const pStyle = `max-width: 580px; margin: 0 auto; line-height: 1.36;`;
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
            <h3>Thank-you for Applying to QHacks 2019!</h3>
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
            <p css={pStyle}>
              For more information regarding QHacks 2019, please visit our
              website at qhacks.io
            </p>
            <div
              css={`
                margin: 40px 0;
              `}
            >
              <ActionButton
                style={`margin-top: 50px;`}
                onClick={() => this.props.previousPage()}
              >
                Previous
              </ActionButton>
            </div>
          </div>
        );
      }
      case 0:
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
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          value={this.state.answers.username}
                          onChange={(e) =>
                            this.setAnswer("username", e.target.value)
                          }
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          value={this.state.answers.password}
                          onChange={(e) =>
                            this.setAnswer("password", e.target.value)
                          }
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <ActionButton
                          style={`margin-top: 50px;`}
                          color="red"
                          onClick={() => this.props.nextPage()}
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
                          value={this.state.answers.firstName}
                          onChange={(e) =>
                            this.setAnswer("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          value={this.state.answers.lastName}
                          onChange={(e) =>
                            this.setAnswer("lastName", e.target.value)
                          }
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="username">Username</label>
                        <input
                          id="username"
                          type="text"
                          value={this.state.answers.username}
                          onChange={(e) =>
                            this.setAnswer("username", e.target.value)
                          }
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          value={this.state.answers.password}
                          onChange={(e) =>
                            this.setAnswer("password", e.target.value)
                          }
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <label htmlFor="confirmPassword">
                          Confirm password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={this.state.answers.confirmPassword}
                          onChange={(e) =>
                            this.setAnswer("confirmPassword", e.target.value)
                          }
                        />
                      </div>
                    </section>
                    <section css={inputRowStyle}>
                      <div>
                        <ActionButton
                          style={`margin-top: 50px;`}
                          color="red"
                          onClick={() => this.props.nextPage()}
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
    }
  }
  render() {
    return (
      <ContentWrapper>{this.getQuestions(this.props.pageNum)}</ContentWrapper>
    );
  }
}

export default ApplicationForm;
