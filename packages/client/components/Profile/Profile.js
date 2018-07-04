import { Segment, Container, Header } from "semantic-ui-react";
import { map, pick } from "lodash";
import { selectors } from "../../HackerStore";
import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";

const { getUser } = selectors;

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
const APPLICATION_STATUS = "applicationStatus";
const RSVP_STATUS = "rsvpStatus";

const USER_FIELDS = [
  EMAIL,
  PHONE_NUMBER,
  DATE_OF_BIRTH,
  GENDER,
  SCHOOL,
  DEGREE_TYPE,
  PROGRAM,
  GRADUATION_YEAR,
  GRADUATION_MONTH,
  TRAVEL_ORIGIN
];

const FIELD_TITLES = {
  [EMAIL]: "Email",
  [PHONE_NUMBER]: "Phone Number",
  [DATE_OF_BIRTH]: "Date Of Birth",
  [GENDER]: "Gender",
  [SCHOOL]: "School",
  [DEGREE_TYPE]: "Degree Type",
  [PROGRAM]: "Program",
  [GRADUATION_YEAR]: "Graduation Year",
  [GRADUATION_MONTH]: "Graduation Month",
  [TRAVEL_ORIGIN]: "Travel Origin"
};

class Profile extends Component {
  renderUserInformation() {
    const { user } = this.props;
    const fields = pick(user, USER_FIELDS);
    return (
      <Segment>
        {map(fields, (value, key) => {
          return (
            <p key={uuid()}>
              {FIELD_TITLES[key]}: {value}
            </p>
          );
        })}
      </Segment>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <Container text style={{ marginTop: "3em" }}>
        <Header as="h2">
          {user.firstName} {user.lastName}
        </Header>
        <Segment.Group>{this.renderUserInformation()}</Segment.Group>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state)
  };
}

export default connect(mapStateToProps, {})(Profile);
