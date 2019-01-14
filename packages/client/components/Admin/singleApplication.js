import React, { Component } from "react";
import AdminWrapper from "./adminWrapper";
import ActionButton from "../ActionButton/ActionButton";
import { offWhite, steel } from "../../assets/colors";
import arrow from "../../assets/img/arrow.svg";
import DashboardSection from "../Dashboard/DashboardSection/DashboardSection";
import { Link } from "react-router-dom";
import Select from "react-select";

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Ross Hill",
      school: "Queen's University",
      status: { label: "Accepted", value: "accepted" },
      score: 4.3,
      givenScore: 0,
      comment: ""
    };
  }
  setSelectAnswer(field) {
    return (answer) =>
      this.setState((state) => {
        state[field] = answer;
        return state;
      });
  }
  render() {
    return (
      <AdminWrapper>
        <div
          css={`
            display: flex;
            border-top: 2px solid ${steel};
            justify-content: space-between;
            height: 100%;
            strong {
              color: #868d99;
              text-transform: uppercase;
              margin: 16px 0 8px;
              display: block;
            }
          `}
        >
          <div
            css={`
              background-color: white;
              box-shadow: 0 2px 16px 0 rgba(212, 217, 225, 0.4);
              width: 380px;
              height: 100%;
              padding: 48px 32px;
              z-index: 3;
            `}
          >
            <div
              css={`
                border-bottom: 2px solid ${steel};
                padding-bottom: 25px;
                > a {
                  display: flex;
                  align-items: center;
                  color: #868d99 !important;
                  margin-bottom: 40px;
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
                Back to application list
              </Link>
              <h1
                css={`
                  font-size: 24px !important;
                `}
              >
                {this.state.name}
              </h1>
              <p
                css={`
                  margin-bottom: 32px;
                `}
              >
                {this.state.school}
              </p>
              <strong>Status</strong>
              <div>{this.state.status.label}</div>
              <Select
                options={[
                  { label: "Accepted", value: "accepted" },
                  { label: "Rejected", value: "rejected" },
                  { label: "Waitlisted", value: "waitlisted" }
                ]}
                id="status"
                key="status"
                className="select"
                value={this.state.status}
                onChange={this.setSelectAnswer("status")}
              />
              <strong>Average score</strong>
              <div>{this.state.score}</div>
            </div>
            <div
              css={`
                padding-top: 25px;
              `}
            >
              <h2
                css={`
                  font-size: 18px !important;
                `}
              >
                Review application
              </h2>
              <p>
                What score would you give {this.state.name}&#39;s application
                out of 5?
              </p>
              <input
                type="number"
                value={this.state.givenScore}
                max={5}
                min={0}
                onChange={(e) =>
                  this.setState({
                    givenScore: e.target.value
                  })
                }
              />
              <p>Please give a few comments to support your scoring</p>
              <textarea
                value={this.state.comment}
                onChange={(e) => this.setState({ comment: e.target.value })}
              />
              <ActionButton color="blue">Submit review</ActionButton>
            </div>
          </div>
          <div
            css={`
              width: calc(100% - 380px);
              background-color: ${offWhite};
              padding: 12px;
              h3.cardHeading {
                color: #838a99 !important;
                text-transform: uppercase;
                font-size: 12px;
                margin: 24px 0 8px;
                &:first-child {
                  margin-top: 0;
                }
              }
            `}
          >
            <div>
              <DashboardSection half title="Personal Details">
                <h3 className="cardHeading">Gender</h3>
                <p>{this.props.gender}</p>
                <h3 className="cardHeading">Phone Number</h3>
                <p>{this.props.phoneNumber}</p>
                <h3 className="cardHeading">Birthday</h3>
                <p>{this.props.birthday}</p>
                <h3 className="cardHeading">Race</h3>
                <p>{this.props.race}</p>
              </DashboardSection>
              <DashboardSection half title="Education">
                <h3 className="cardHeading">School</h3>
                <p>{this.props.school}</p>
                <h3 className="cardHeading">Program</h3>
                <p>{this.props.program}</p>
                <h3 className="cardHeading">Degree type</h3>
                <p>{this.props.degree}</p>
              </DashboardSection>
            </div>
            <div>
              <DashboardSection title="Hackathon Information">
                <h3 className="cardHeading">
                  Why do you want to attend QHacks?
                </h3>
                <p>{this.props.gender}</p>
                <h3 className="cardHeading">
                  How many hackathons have you attended?
                </h3>
                <p>{this.props.numAttendedHackathons}</p>
                <h3 className="cardHeading">Where are you travelling from?</h3>
                <p>{this.props.travelOrigin}</p>
              </DashboardSection>
            </div>
          </div>
        </div>
      </AdminWrapper>
    );
  }
}

export default SingleApplication;
