import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import ActionButton from "../ActionButton/ActionButton";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import { races, schools } from "../../assets/constants";

const toOptions = (str) => {
  return {
    label: str,
    value: str
  };
};

const raceOptions = races.map((str) => toOptions(str));

const genderOptions = ["Male", "Female"].map((str) => toOptions(str));

const schoolOptions = schools.map((str) => toOptions(str));

const degreeOptions = [
  "Bachelor of Science",
  "Bachelor of Arts",
  "Bachelor of Engineering",
  "Bachelor of Computing"
].map((str) => toOptions(str));

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
].map((str) => toOptions(str));

const Step2 = (props) => {
  const setApplicationAnswerSelect = (field) => {
    return (answer) => props.setApplicationAnswer(field, answer.value);
  };

  const getApplicationAnswerSelect = (field) => {
    const val = props.applicationAnswers[field];
    return {
      label: val,
      value: val
    };
  };

  return (
    <div css={props.formStyle}>
      <h2>Tell us about yourself</h2>
      <div css={props.subsectionStyle}>
        <div css={props.subsectionTitleStyles}>Personal Details</div>
        <div css={props.subsectionContentStyles}>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="gender">Gender</label>
              <CreatableSelect
                options={genderOptions}
                id="gender"
                key="gender"
                className="select"
                value={getApplicationAnswerSelect("gender")}
                onChange={setApplicationAnswerSelect("gender")}
              />
              <ValidationError message={props.errors.gender} />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                key="phoneNumber"
                type="tel"
                placeholder="Phone number"
                value={props.applicationAnswers.phoneNumber}
                onChange={(e) =>
                  props.setApplicationAnswer("phoneNumber", e.target.value)
                }
              />
              <ValidationError message={props.errors.phoneNumber} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="birthday">Birthday</label>
              <input
                id="birthday"
                key="birthday"
                type="date"
                value={props.applicationAnswers.birthday}
                onChange={(e) =>
                  props.setApplicationAnswer("birthday", e.target.value)
                }
              />
              <ValidationError message={props.errors.birthday} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="race">Race</label>
              <CreatableSelect
                options={raceOptions}
                id="race"
                key="race"
                className="select"
                value={getApplicationAnswerSelect("race")}
                onChange={setApplicationAnswerSelect("race")}
              />
              <ValidationError message={props.errors.race} />
            </div>
          </section>
        </div>
      </div>
      <div css={props.subsectionStyle}>
        <div css={props.subsectionTitleStyles}>Education</div>
        <div css={props.subsectionContentStyles}>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="school">What school do you attend?</label>
              <CreatableSelect
                options={schoolOptions}
                id="school"
                key="school"
                className="select"
                value={getApplicationAnswerSelect("school")}
                onChange={setApplicationAnswerSelect("school")}
              />
              <ValidationError message={props.errors.school} />
            </div>
            <div>
              <label htmlFor="program">What is your program?</label>
              <input
                type="text"
                id="program"
                key="program"
                placeholder="Program"
                value={props.applicationAnswers.program}
                onChange={(e) =>
                  props.setApplicationAnswer("program", e.target.value)
                }
              />
              <ValidationError message={props.errors.program} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="degree">Degree type</label>
              <CreatableSelect
                options={degreeOptions}
                id="degree"
                key="degree"
                className="select"
                value={getApplicationAnswerSelect("degree")}
                onChange={setApplicationAnswerSelect("degree")}
              />
              <ValidationError message={props.errors.degree} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="graduationMonth">Graduation date</label>
              <Select
                options={monthOptions}
                id="graduationMonth"
                key="graduationMonth"
                className="select"
                value={getApplicationAnswerSelect("graduationMonth")}
                onChange={setApplicationAnswerSelect("graduationMonth")}
              />
              <ValidationError message={props.errors.graduationMonth} />
            </div>
            <div>
              <input
                id="graduationYear"
                key="graduationYear"
                placeholder="Year"
                type="text"
                value={props.applicationAnswers.graduationYear}
                css={`
                  margin-top: 28px !important;
                `}
                onChange={(e) =>
                  props.setApplicationAnswer("graduationYear", e.target.value)
                }
              />
              <ValidationError message={props.errors.graduationYear} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <ActionButton
                disabled={props.hasErrors}
                style={`margin-top: 50px; float: right;`}
                color="red"
                onClick={() => props.nextStep()}
              >
                Continue
              </ActionButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Step2;
