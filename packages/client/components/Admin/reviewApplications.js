import React, { Component } from "react";
import AdminWrapper from "./adminWrapper";
import ApplicationRow from "./applicationRow";
import ApplicationFilters from "./applicationFilters";
import { blue, offWhite, steel } from "../../assets/colors";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

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
  render() {
    const applications = [
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
    return (
      <AdminWrapper>
        <ContentWrapper>
          <div
            css={`
              margin-top: 120px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              > * {
                display: inline-block;
              }
            `}
          >
            <h1
              css={`
                color: #252525;
                font-size: 28px;
              `}
            >
              Applications
            </h1>
            <div>
              <input
                css={`
                  background-color: white !important;
                `}
                type="text"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                placeholder="Search for an application"
              />
            </div>
          </div>
        </ContentWrapper>
        <div
          css={`
            background-color: ${offWhite};
            padding: 48px 0;
            border-top: 2px solid ${blue};
          `}
        >
          <ContentWrapper>
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
                      width: 16.7%;
                      font-weight: 600;
                    }
                  `}
                >
                  <div>Name</div>
                  <div>School</div>
                  <div>Status</div>
                  <div>RSVP</div>
                  <div>Score</div>
                  <div>D.O.S</div>
                </div>
                {applications.map((app) => (
                  <ApplicationRow key={app.id} {...app} />
                ))}
              </div>
            </div>
          </ContentWrapper>
        </div>
      </AdminWrapper>
    );
  }
}

export default ReviewApplications;
