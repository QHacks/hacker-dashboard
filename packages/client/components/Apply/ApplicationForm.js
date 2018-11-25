import React, { PureComponent } from "react";
import CreatableSelect from "react-select/lib/Creatable";

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
    return (answer) => this.setAnswer(field, answer);
  }
  getQuestions(num) {
    const subsectionStyle = `
            display: flex;
            >div:first-child {
                width: 30%;
            };
            >div:last-child {
                width: 70%;
            }
            div > section {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                label, input {
                    display: block;
                }
                >div {
                    flex-grow: 1;
                }
            }
        `;
    const raceOptions = [
      { value: "White", label: "White" },
      { value: "South Asian", label: "South Asian" },
      { value: "Chinese", label: "Chinese" },
      { value: "Black", label: "Black" },
      { value: "Filipino", label: "Filipino" },
      { value: "Latin American", label: "Latin American" },
      { value: "Arab", label: "Arab" },
      { value: "Southeast Asian", label: "Southeast Asian" },
      { value: "West Asian", label: "West Asian" },
      { value: "Korean", label: "Korean" },
      { value: "Japanese", label: "Japanese" },
      {
        value: "Aboriginal",
        label: "Aboriginal (First Nations, Métis, or Inuit)"
      }
    ];
    const genderOptions = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" }
    ];
    switch (num) {
      case 1: {
        return (
          <div>
            <h3>Tell us about yourself</h3>
            <div css={subsectionStyle}>
              <div>Personal Details</div>
              <div>
                <section>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <CreatableSelect
                      options={genderOptions}
                      id="gender"
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
                      onChange={this.setAnswerSelect("race")}
                    />
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
          </div>
        );
      }
      case 3: {
        return (
          <div>
            <h3>Thank-you for Applying to QHacks 2019!</h3>
          </div>
        );
      }
      case 0:
      default: {
        return (
          <div>
            <h3>Create an Account</h3>
          </div>
        );
      }
    }
  }
  render() {
    return (
      <div
        css={`
          padding: 10%;
        `}
      >
        {this.getQuestions(this.props.pageNum)}
      </div>
    );
  }
}

export default ApplicationForm;
