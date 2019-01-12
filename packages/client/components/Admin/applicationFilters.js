import React, { Component } from "react";
import ActionButton from "../ActionButton/ActionButton";
import Checkbox from "react-simple-checkbox";
import { checkboxOptions } from "../../assets/constants";

class ApplicationFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setParentState(newState) {
    return this.props.setState(newState);
  }
  render() {
    return (
      <div
        css={`
          padding: 0 64px 0 0;
          box-sizing: content-box;
          width: 280px;
          strong.heading {
            display: block;
            margin: 14px 0;
          }
          label {
            color: #252525;
            font-weight: regular;
            cursor: pointer;
          }
          select {
            min-width: 80%;
          }
        `}
      >
        <strong className="heading">Automate Application Statuses</strong>
        <ActionButton color="blue">Update Statuses</ActionButton>
        <strong className="heading">Export</strong>
        <select
          value={this.props.exportSelect}
          onChange={(e) =>
            this.setParentState({ exportSelect: e.target.value })
          }
        >
          <option value="All Applications">All Applications</option>
          <option value="All Visible">All Visible</option>
        </select>
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
        <select value={this.props.exportSelect}>
          <option value="name">Name (A-Z)</option>
          <option value="university">University (A-Z)</option>
          <option value="score">Score</option>
        </select>
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
          Displaying applications with scored greater than:{" "}
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
