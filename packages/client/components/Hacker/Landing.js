import ApplicationSubmitted from "./ApplicationSubmitted";
import ApplicationWithdrawn from "./ApplicationWithdrawn";
import SuccessfulApplicant from "./SuccessfulApplicant";
import WaitlistedApplicant from "./WaitlistedApplicant";
import DeclinedApplicant from "./DeclinedApplicant";
import { Container } from "semantic-ui-react";
import React, { Component } from "react";

const RSVP_FIELDS = [
  "favSnack",
  "emergencyFirstName",
  "emergencyLastName",
  "emergencyEmail",
  "emergencyPhoneNumber",
  "emergencyRelationToContact",
  "tshirtSize"
];

class HackerLanding extends Component {
  handleSubmitRSVP(values) {
    // do some validation and submit rsvp via api request
  }

  handleApplicationWithdraw() {
    // make an api request to withdraw an application
  }

  renderCorrectStatus() {
    const rsvpLoading = false;
    const rsvpError = false;
    const application = {
      status: "APPLIED",
      rsvp: "COMPLETED"
    };

    switch (application.status) {
      case "APPLIED":
        return <ApplicationSubmitted />;
      case "REJECTED":
        return <DeclinedApplicant />;
      case "WAITING_LIST":
        return <WaitlistedApplicant />;
      case "WITHDRAWN":
        return <ApplicationWithdrawn />;
      case "ACCEPTED":
        return (
          <SuccessfulApplicant
            rsvpStatus={application.rsvp}
            onSubmit={this.handleSubmitRSVP.bind(this)}
            onWithdrawApplication={this.handleApplicationWithdraw.bind(this)}
            rsvpLoading={rsvpLoading}
            rsvpError={rsvpError}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Container style={{ marginTop: "3em" }}>
        {this.renderCorrectStatus()}
      </Container>
    );
  }
}

export default HackerLanding;
