import { Segment, Container, Header } from "semantic-ui-react";
import React, { Component } from "react";
import { map, pick } from "lodash";
import uuid from "uuid/v4";

const EMAIL = "email";

const USER_FIELDS = [EMAIL];

const FIELD_TITLES = {
  [EMAIL]: "Email"
};

class Profile extends Component {
  renderUserInformation() {
    // this would be fetched from api and pulled from props
    const user = {
      firstName: "Robert",
      lastName: "Saunders",
      email: "robert@qhacks.io"
    };

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
    // this would be fetched from api and pulled from props
    const user = {
      firstName: "Robert",
      lastName: "Saunders",
      email: "robert@qhacks.io"
    };

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

export default Profile;
