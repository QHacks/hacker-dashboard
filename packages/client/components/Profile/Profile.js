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
      <div>
        {map(fields, (value, key) => (
          <p key={uuid()}>
            {FIELD_TITLES[key]}:{value}
          </p>
        ))}
      </div>
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
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <div>{this.renderUserInformation()}</div>
      </div>
    );
  }
}

export default Profile;
