import React, { PureComponent } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import ApplicationAuthSlider from "./ApplicationAuthSlider";

import { css } from "emotion";

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
    const subsectionStyle = `
            display: flex;
            margin: 36px 0;
            section {
                width: 100%;
                display: flex;
                flex-direction: row;
                margin-top:16px;
                align-items: stretch;
                label, input {
                    display: block;
                }
                >div {
                    flex-grow: 1;
                    min-width: 50%;
                    >label {
                        margin: 4px;
                        text-align: left;
                    }
                    >input {
                        height: 38px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        margin: 4px;
                        padding: 0 6px;
                        line-height:38px;
                        width: calc(100% - 8px);
                        background-color: #f8f8f8;
                    }
                    >textarea {
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        margin: 4px;
                        padding: 6px;
                        width: 100%;
                        min-height: 200px;
                        background-color: #f8f8f8;
                    }
                    >input#graduationYear {
                        margin-top: 26px;
                    }
                }
            }
        `;
    const subsectionTitleStyles = `
      width: 30%;
    `;
    const subsectionContentStyles = `
    width: 70%;
    `;
    const selectStyles = css`
      > div {
        background-color: #f8f8f8;
      }
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
      case 1: {
        return (
          <div>
            <h2>Tell us about yourself</h2>
            <div css={subsectionStyle}>
              <div css={subsectionTitleStyles}>Personal Details</div>
              <div css={subsectionContentStyles}>
                <section>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <CreatableSelect
                      options={genderOptions}
                      id="gender"
                      className={selectStyles}
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
                <section>
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
                <section>
                  <div>
                    <label htmlFor="race">Race</label>
                    <CreatableSelect
                      isMulti
                      options={raceOptions}
                      id="race"
                      className={selectStyles}
                      onChange={this.setAnswerSelect("race")}
                    />
                  </div>
                </section>
              </div>
            </div>
            <div css={subsectionStyle}>
              <div css={subsectionTitleStyles}>Education</div>
              <div css={subsectionContentStyles}>
                <section>
                  <div>
                    <label htmlFor="school">What school do you attend?</label>
                    <CreatableSelect
                      options={schoolOptions}
                      id="school"
                      className={selectStyles}
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
                <section>
                  <div>
                    <label htmlFor="degree">Degree type</label>
                    <CreatableSelect
                      options={degreeOptions}
                      id="degree"
                      className={selectStyles}
                      onChange={this.setAnswerSelect("degree")}
                    />
                  </div>
                </section>
                <section>
                  <div>
                    <label htmlFor="graduationMonth">Graduation date</label>
                    <Select
                      options={monthOptions}
                      id="graduationMonth"
                      className={selectStyles}
                      onChange={this.setAnswerSelect("graduationMonth")}
                    />
                  </div>
                  <div>
                    <input
                      id="graduationYear"
                      type="number"
                      value={this.state.graduationYear}
                      onChange={(e) =>
                        this.setAnswer("graduationYear", e.target.value)
                      }
                    />
                  </div>
                </section>
                <section>
                  <div>
                    <button onClick={() => this.props.previousPage()}>
                      Previous
                    </button>{" "}
                    <button onClick={() => this.props.nextPage()}>Next</button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div>
            <h3>Hackathon Information</h3>
            <div css={subsectionStyle}>
              <div
                css={`
                  width: 100%;
                `}
              >
                <section>
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
                <section>
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
                <section>
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
                <section>
                  <div>
                    <button onClick={() => this.props.previousPage()}>
                      Previous
                    </button>{" "}
                    <button onClick={() => this.props.nextPage()}>
                      Submit
                    </button>
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
              <button>View Dashoard</button>
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
              <button onClick={() => this.props.previousPage()}>
                Previous
              </button>
            </div>
          </div>
        );
      }
      case 0:
      default: {
        return (
          <div
            css={`
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
                <h2>Login to Account</h2>
                <div css={subsectionStyle}>
                  <div
                    css={`
                      width: 100%;
                    `}
                  >
                    <section>
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
                    <section>
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
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2>Create an Account</h2>
                <div css={subsectionStyle}>
                  <div
                    css={`
                      width: 100%;
                    `}
                  >
                    <section>
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
                    <section>
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
                    <section>
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
                    <section>
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
                    <section>
                      <div>
                        <button onClick={() => this.props.nextPage()}>
                          Next
                        </button>
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
      <div
        css={`
          padding: 64px 15%;
        `}
      >
        {this.getQuestions(this.props.pageNum)}
      </div>
    );
  }
}

export default ApplicationForm;
