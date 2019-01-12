import React, { Component } from "react";
import { steel, blue, red } from "../../assets/colors";

class ApplicationRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStatusColor() {
    switch (this.props.status) {
      case "accepted":
        return blue;
      case "rejected":
        return red;
      default:
        "#616161";
    }
  }
  getRsvpString() {
    return this.props.rsvp;
  }
  render() {
    return (
      <div
        onClick={() => location.replace(`/admin/application/${this.props.id}`)}
        css={`
          display: flex;
          align-items: center;
          background-color: white;
          border: 1px solid ${steel};
          color: #252525;
          margin-bottom: 8px;
          padding: 18px 32px;
          border-radius: 8px;
          > * {
            width: 16.7%;
            padding: 0 1rem;
          }
        `}
      >
        <div
          css={`
            font-weight: 600;
          `}
        >
          {this.props.name}
        </div>
        <div>{this.props.school}</div>
        <div
          css={`
            font-weight: 600;
            color: ${this.getStatusColor()};
            text-transform: uppercase;
          `}
        >
          {this.props.status}
        </div>
        <div>{this.getRsvpString()}</div>
        <div
          css={`
            font-weight: 600;
          `}
        >
          {this.props.score || "-"}
        </div>
        <div
          css={`
            color: #616161;
          `}
        >
          {this.props.dateSubmitted}
        </div>
      </div>
    );
  }
}

export default ApplicationRow;
