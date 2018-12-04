import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import abstractTech from "../../../assets/img/abstractTech.svg";
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
    if (this.props.data.hasApplied) {
      return (
        <Card title="QHacks 2019" image={abstractTech}>
          <table
            css={`
              border: none;
              margin: 0 -4px;
              td {
                border: none;
                :first-child {
                  color: #626b7b;
                  font-weight: 600;
                }
                padding: 4px;
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
                <td>Applied</td>
              </tr>
            </tbody>
          </table>
          <div>
            <strong
              css="
                display: block;
                margin: 30px 0 8px;
                font-size: 18px;
              "
            >
              Thanks for applying!
            </strong>
            <p>
              Your application is in and the QHacks’s team is working hard to
              review it carefully. Stay tuned for updates.
            </p>
          </div>
        </Card>
      );
    }

    return (
      <Card title="QHacks 2019" image={abstractTech}>
        <table
          css={`
            border: none;
            margin: 0 -4px;
            td {
              border: none;
              :first-child {
                color: #626b7b;
                font-weight: 600;
              }
              padding: 4px;
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
              <td>Not Applied</td>
            </tr>
          </tbody>
        </table>
        <div>
          <strong
            css="
              display: block;
              margin: 30px 0 8px;
              font-size: 18px;
            "
          >
            Apply now to QHacks 2019!
          </strong>
          <Link to="/qhacks-2019/apply">Apply here</Link>
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

export default graphql(HACKER_INFO)(Events);
