import React, { Component } from "react";
import AdminWrapper from "./adminWrapper";
import ActionButton from "../ActionButton/ActionButton";
import { offWhite, steel } from "../../assets/colors";
import arrow from "../../assets/img/arrow.svg";
import DashboardSection from "../Dashboard/DashboardSection/DashboardSection";

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Ross Hill",
      school: "Queen's University",
      status: "accepted",
      score: 4.3,
      givenScore: 0,
      comment: ""
    };
  }
  render() {
    return (
      <AdminWrapper>
        <div
          css={`
            display: flex;
            justify-content: space-between;
            height: 100%;
            strong {
              color: #868d99;
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
            `}
          >
            <div
              css={`
                border-bottom: 2px solid ${steel};
                padding-bottom: 25px;
              `}
            >
              <strong
                css={`
                  display: flex;
                  align-items: center;
                `}
              >
                <img
                  src={arrow}
                  css={`
                    transform: rotate(180deg);
                    margin-right: 8px;
                  `}
                />{" "}
                Back to application list
              </strong>
              <h1
                css={`
                  font-size: 24px !important;
                `}
              >
                {this.state.name}
              </h1>
              <p>{this.state.school}</p>
              <strong>Status</strong>
              <div>{this.state.status}</div>
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
                What score would you give {this.state.name}'s application out of
                5?
              </p>
              <input
                type="number"
                value={this.state.givenScore}
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
            `}
          >
            <div>
              <DashboardSection half title="Personal Details">
                Gender
              </DashboardSection>
              <DashboardSection half title="Education">
                School
              </DashboardSection>
            </div>
            <div>
              <DashboardSection title="Hackathon Information">
                Answers
              </DashboardSection>
            </div>
          </div>
        </div>
      </AdminWrapper>
    );
  }
}

export default SingleApplication;
