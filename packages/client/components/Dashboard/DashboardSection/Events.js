import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import abstractTech from "../../../assets/img/abstractTech.svg";
import ActionButton from "../../ActionButton/ActionButton";
import DashboardSection from "./DashboardSection";
import Card from "../Card/Card";

const HACKER_INFO = gql`
  query {
    user {
      ... on Hacker {
        hasApplied(eventSlug: "qhacks-2019")
      }
    }
  }
`;

class Events extends Component {
  renderUserEvents() {
    const { user } = this.props.data;

    return (
      <Card title="QHacks 2019" image={abstractTech}>
        <table
          css={`
            border: none;
            margin: 0 -4px;
            td {
              border: none;
              padding: 4px;
              font-size: 15px;
              font-weight: 500;
              :first-child {
                color: #626b7b;
                font-weight: 600;
                text-transform: uppercase;
              }
            }
          `}
        >
          <tbody>
            <tr>
              <td>Date:</td>
              <td>February 1-3, 2019</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{user && user.hasApplied ? "Applied" : "Not Applied"}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <strong
            css={`
              display: block;
              margin: 25px 0 10px;
              font-size: 18px;
            `}
          >
            {user && user.hasApplied
              ? "Thanks for applying!"
              : "Apply to attend now!"}
          </strong>
          {user && user.hasApplied ? (
            <p
              css={`
                line-height: 1.47;
                font-size: 15px;
              `}
            >
              Your application is in and the QHacks team is working hard to
              review it carefully. Stay tuned for updates!
            </p>
          ) : (
            <div css="margin: 20px 0px 0px 0px;">
              <ActionButton color="red" internal link="/qhacks-2019/apply">
                Apply Here
              </ActionButton>
            </div>
          )}
        </div>
      </Card>
    );
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <DashboardSection title="Events">
        {this.renderUserEvents()}
      </DashboardSection>
    );
  }
}

export default graphql(HACKER_INFO, {
  options: {
    fetchPolicy: "cache-and-network"
  }
})(Events);
