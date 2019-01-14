import React, { Component } from "react";
import AdminWrapper from "./adminWrapper";
import { Link } from "react-router-dom";
import { offWhite, blue } from "../../assets/colors";
import ActionButton from "../ActionButton/ActionButton";
import ApplicationRow from "./applicationRow";
import arrow from "../../assets/img/arrow.svg";
import Select from "react-select";

class UpdateStatuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      scoreFilter: "higher",
      score: 4,
      numMatched: 0
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
  setSelectAnswer(field) {
    return (answer) =>
      this.setState((state) => {
        state[field] = answer;
        return state;
      });
  }
  render() {
    const applications = this.getApplications();
    return (
      <AdminWrapper>
        <div
          css={`
            padding: 28px 48px;
            background-color: white;
            box-shadow: 0 2px 16px 0 rgba(212, 217, 225, 0.4);
            h1 {
              font-size: 28px;
              color: #252525;
              margin-top: 32px;
            }
            a {
              font-size: 15px;
              color: #868d99 !important;
              display: flex;
              align-items: center;
            }
          `}
        >
          <Link to="/admin/applications">
            <img
              src={arrow}
              css={`
                transform: rotate(180deg);
                margin-right: 8px;
              `}
            />{" "}
            Back to Application List
          </Link>
          <h1>Update statuses</h1>
        </div>
        <div
          css={`
            padding: 48px;
            background-color: ${offWhite};
          `}
        >
          <div
            css={`
              min-height: 300px;
              border-radius: 8px;
              box-shadow: 1px 2px 4px 0 rgba(183, 190, 200, 0.3);
              background-color: #ffffff;
              padding: 32px;
            `}
          >
            <p>
              Please define the criteria to update multiple application
              statuses.
            </p>
            <div
              css={`
                padding: 40px 0;
                > input {
                  display: inline-block !important;
                  margin: 0 8px !important;
                  width: unset !important;
                }
                .select {
                  display: inline-block !important;
                  margin: 0 8px !important;
                  width: 200px !important;
                }
              `}
            >
              <span>I want to</span>
              <Select
                options={[
                  { label: "accept", value: "accept" },
                  { label: "reject", value: "reject" },
                  { label: "waitlist", value: "waitlist" }
                ]}
                id="status"
                key="status"
                className="select"
                value={this.state.status}
                onChange={this.setSelectAnswer("status")}
              />
              <span>applications with scores</span>
              <Select
                options={[
                  { label: "greater than", value: "greater than" },
                  { label: "less than", value: "less than" }
                ]}
                id="scoreFilter"
                key="scoreFilter"
                className="select"
                value={this.state.scoreFilter}
                onChange={this.setSelectAnswer("scoreFilter")}
              />{" "}
              than
              <input
                type="number"
                min={0}
                value={this.state.score}
                onChange={(e) => this.setState({ score: e.target.value })}
              />
            </div>
            <div>
              <ActionButton color="white">Search applications</ActionButton>
            </div>
            <p
              css={`
                margin-top: 16px;
              `}
            >
              Note: All applications that already have statuses will be omitted
              from the search results.
            </p>
          </div>
          <div
            css={`
              border-radius: 8px;
              border: 1px solid ${blue};
              box-shadow: 1px 2px 4px 0 rgba(183, 190, 200, 0.3);
              background-color: #ffffff;
              padding: 32px;
              margin: 24px 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <p
              css={`
                font-weight: bold;
                font-size: 20px;
              `}
            >
              {this.state.numMatched} applications match the defined criteria
            </p>
            <ActionButton color="blue">Update Statuses</ActionButton>
          </div>
          <div>
            <h3
              css={`
                color: #252525;
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 24px;
                margin-top: 40px;
              `}
            >
              Application results
            </h3>
          </div>
          {applications.map((app) => (
            <ApplicationRow key={app.id} {...app} />
          ))}
        </div>
      </AdminWrapper>
    );
  }
}

export default UpdateStatuses;
