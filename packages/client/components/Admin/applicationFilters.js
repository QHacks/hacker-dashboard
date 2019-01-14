import React, { Component } from "react";
import ActionButton from "../ActionButton/ActionButton";
import Checkbox from "react-simple-checkbox";
import { checkboxOptions } from "../../assets/constants";
import Select from "react-select";

class ApplicationFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setParentState(newState) {
    return this.props.setState(newState);
  }
  setSelectAnswer(field) {
    return (answer) =>
      this.setParentState((state) => {
        state[field] = answer;
        return state;
      });
  }
  render() {
    return (
      <div
        css={`
          padding: 0 48px 0 0;
          box-sizing: content-box;
          width: 280px;
          strong.heading {
            display: block;
            margin: 24px 0 14px;
            &:first-child {
              margin-top: 0;
            }
          }
          label {
            color: #252525;
            font-weight: regular;
            cursor: pointer;
          }
          select {
            min-width: 80%;
          }
          .select > div {
            background-color: white !important;
          }
        `}
      >
        <strong className="heading">Automate Application Statuses</strong>
        <ActionButton internal link="/admin/applications/update" color="blue">
          Update Statuses
        </ActionButton>
        <strong className="heading">Export</strong>
        <Select
          options={[
            { label: "All applications", value: "all" },
            { label: "Visible applications", value: "visible" }
          ]}
          id="exportSelect"
          key="exportSelect"
          className="select"
          value={this.state.exportSelect}
          onChange={this.setSelectAnswer("exportSelect")}
        />
        <div>
          <ActionButton style={`margin-top: 8px;`} color="white">
            Export
          </ActionButton>
        </div>
        <strong className="heading">Display</strong>
        <Checkbox
          id="needsReviews"
          {...checkboxOptions}
          checked={this.props.reviewedFilter}
          onChange={(bool) => this.setParentState({ reviewedFilter: bool })}
        />
        <label htmlFor="needsReviews">Needs Reviews</label>
        <strong className="heading">Sort</strong>
        <Select
          options={[
            { label: "Name (A-Z)", value: "name" },
            { label: "School (A-Z)", value: "school" },
            { label: "Score", value: "score" }
          ]}
          id="score"
          key="score"
          className="select"
          value={this.state.score}
          onChange={this.setSelectAnswer("score")}
        />
        <strong className="heading">App Status</strong>
        <div>
          <Checkbox
            id="showNoStatus"
            {...checkboxOptions}
            checked={this.props.showNoStatus}
            onChange={(bool) => this.setParentState({ showNoStatus: bool })}
          />
          <label htmlFor="showNoStatus">No Status ()</label>
        </div>
        <div>
          <Checkbox
            id="showAccepted"
            {...checkboxOptions}
            checked={this.props.showAccepted}
            onChange={(bool) => this.setParentState({ showAccepted: bool })}
          />
          <label htmlFor="showAccepted">Accepted ()</label>
        </div>
        <div>
          <Checkbox
            id="showWaitlisted"
            {...checkboxOptions}
            checked={this.props.showWaitlisted}
            onChange={(bool) => this.setParentState({ showWaitlisted: bool })}
          />
          <label htmlFor="showWaitlisted">Waitlisted ()</label>
        </div>
        <div>
          <Checkbox
            id="showRejected"
            {...checkboxOptions}
            checked={this.props.showRejected}
            onChange={(bool) => this.setParentState({ showRejected: bool })}
          />
          <label htmlFor="showRejected">Rejected ()</label>
        </div>
        <strong className="heading">Score</strong>
        <p>
          Displaying applications with scores greater than:{" "}
          <strong
            css={`
              display: inline;
            `}
          >
            {this.props.scoreFilter}
          </strong>
        </p>
        <input
          type="range"
          min="0"
          max="10"
          value={this.props.scoreFilter}
          onChange={(e) => this.setParentState({ scoreFilter: e.target.value })}
          id="scoreFilterSlider"
        />
      </div>
    );
  }
}

export default ApplicationFilters;
