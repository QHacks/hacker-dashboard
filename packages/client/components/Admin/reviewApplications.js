import React, { Component } from "react";
import AdminWrapper from "./adminWrapper";
import ApplicationRow from "./applicationRow";
import ApplicationFilters from "./applicationFilters";
import { blue, offWhite, steel } from "../../assets/colors";
// import { graphql, compose } from "react-apollo";
// import gql from "graphql-tag";

// const REVIEW_APPLICATION_MUTATION = gql``;

class ReviewApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportSelect: false,
      reviewedFilter: false,
      showNoStatus: true,
      showAccepted: true,
      showWaitlisted: true,
      showRejected: true,
      scoreFilter: 0
    };
  }
  getApplications() {
    return [
      {
        id: 1,
        name: "Ross Hill",
        school: "Queen's University",
        status: "accepted",
        rsvp: "yes",
        score: 5,
        dateSubmitted: "2018-01-01",
        email: "whatever"
      },
      {
        id: 2,
        name: "Hoss Ross",
        school: "Queen's University",
        status: "rejected",
        rsvp: "no",
        score: 1,
        dateSubmitted: "2018-01-02",
        email: "whatever2"
      },
      {
        id: 3,
        name: "Waterloo",
        school: "Queen's University",
        status: "waitlisted",
        // rsvp: null
        score: 3,
        dateSubmitted: "2018-01-02",
        email: "whatever2"
      }
    ];
  }
  render() {
    const applications = this.getApplications();
    return (
      <AdminWrapper>
        <div
          css={`
            display: flex;
            justify-content: space-between;
            padding: 0 45px;
            align-items: center;
            > * {
              display: inline-block;
            }
          `}
        >
          <h1
            css={`
              color: #252525 !important;
              font-size: 28px !important;
            `}
          >
            Applications
          </h1>
          <div>
            <input
              css={`
                background-color: white !important;
                min-width: 300px;
              `}
              type="text"
              value={this.state.searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
              placeholder="Search for an application"
            />
          </div>
        </div>
        <div
          css={`
            background-color: ${offWhite};
            padding: 48px;
            border-top: 2px solid ${blue};
          `}
        >
          <div
            css={`
              display: flex;
              justify-content: space-around;
            `}
          >
            <ApplicationFilters
              {...this.state}
              setState={(state) => this.setState(state)}
            />
            <div
              css={`
                flex-grow: 1;
              `}
            >
              <div
                css={`
                  display: flex;
                  background-color: white;
                  border: 1px solid ${steel};
                  border-bottom: 1px solid #252525;
                  border-radius: 4px;
                  margin-bottom: 28px;
                  padding: 8px 32px;
                  > * {
                    padding: 0 0.5rem;
                    font-weight: 600;
                  }
                `}
              >
                <div css="width:25%">Name</div>
                <div css="width:25%">School</div>
                <div css="width:15%">Status</div>
                <div css="width:10%">RSVP</div>
                <div css="width:10%">Score</div>
                <div css="width:15%">D.O.S</div>
              </div>
              {applications.map((app) => (
                <ApplicationRow key={app.id} {...app} />
              ))}
            </div>
          </div>
        </div>
      </AdminWrapper>
    );
  }
}

// export default compose(
//   graphql(REVIEW_APPLICATION_MUTATION, {
//     name: "reviewApplication"
//   })
// )(ReviewApplications);

export default ReviewApplications;
