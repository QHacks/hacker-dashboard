import { isFunction, map, pick } from "lodash";
import moment from "moment";
import React from "react";

/* HackerApplication Fields */
const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const EMAIL = "email";
const PHONE_NUMBER = "phoneNumber";
const DATE_OF_BIRTH = "dateOfBirth";
const GENDER = "gender";
const SCHOOL = "school";
const DEGREE_TYPE = "degreeType";
const PROGRAM = "program";
const GRADUATION_YEAR = "graduationYear";
const GRADUATION_MONTH = "graduationMonth";
const TRAVEL_ORIGIN = "travelOrigin";
const NUMBER_OF_HACKATHONS = "numberOfHackathons";
const WHY_QHACKS = "whyQhacks";
const LINKS = "links";

const HACKER_FIELDS = [
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PHONE_NUMBER,
  DATE_OF_BIRTH,
  GENDER,
  SCHOOL,
  DEGREE_TYPE,
  PROGRAM,
  GRADUATION_YEAR,
  GRADUATION_MONTH,
  TRAVEL_ORIGIN,
  NUMBER_OF_HACKATHONS,
  WHY_QHACKS,
  LINKS
];

const APPLICATION_FIELDS = [
  TRAVEL_ORIGIN,
  NUMBER_OF_HACKATHONS,
  WHY_QHACKS,
  LINKS
];

const APPLICATION_VALUE_TRANSFORMATIONS = {
  [DATE_OF_BIRTH]: (value) => moment(value).format("MMM Do, YYYY")
};

const FIELD_TITLES = {
  [FIRST_NAME]: "First Name",
  [LAST_NAME]: "Last Name",
  [EMAIL]: "Email",
  [PHONE_NUMBER]: "Phone Number",
  [DATE_OF_BIRTH]: "Date Of Birth",
  [GENDER]: "Gender",
  [SCHOOL]: "School",
  [DEGREE_TYPE]: "Degree Type",
  [PROGRAM]: "Program",
  [GRADUATION_YEAR]: "Graduation Year",
  [GRADUATION_MONTH]: "Graduation Month",
  [TRAVEL_ORIGIN]: "Travel Origin",
  [NUMBER_OF_HACKATHONS]: "Number Of Hackathons",
  [WHY_QHACKS]: "Why Qhacks?",
  [LINKS]: "Links"
};

export default ({ application, ...rest }) => {
  const fields = {
    ...pick(application, HACKER_FIELDS),
    ...pick(application.applications[0], APPLICATION_FIELDS)
  };
  return (
    <div {...rest}>
      {map(fields, (value, key) => {
        const transformation = APPLICATION_VALUE_TRANSFORMATIONS[key];
        return (
          <div key={key} style={{ marginBottom: "20px" }}>
            <div>
              <b>{FIELD_TITLES[key]}</b>
            </div>
            <div>
              {(isFunction(transformation) && transformation(value)) || value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
