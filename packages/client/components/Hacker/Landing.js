import { selectors, actionCreators } from "../../HackerStore";
import ApplicationSubmitted from "./ApplicationSubmitted";
import ApplicationWithdrawn from "./ApplicationWithdrawn";
import SuccessfulApplicant from "./SuccessfulApplicant";
import WaitlistedApplicant from "./WaitlistedApplicant";
import DeclinedApplicant from "./DeclinedApplicant";
import { Container } from "semantic-ui-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduce, map, merge } from "lodash";
import camelcase from "camelcase";

const { submitRSVP, withdrawApplication } = actionCreators;
const {
  getUser,
  getRSVPLoading,
  getRSVPError,
  getRSVPSubmitted,
  getWithdrawError
} = selectors;

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
    // TODO: fix this bull shit form validation
    const formComplete = RSVP_FIELDS.reduce((accum, key) => {
      if (!Object.keys(values).includes(key)) {
        return false;
      }
      return accum;
    }, true);

    if (formComplete) {
      const { user } = this.props;
      const userId = user._id;
      const eventId = user.events[0]; // TODO: Hack. Inform the dashboard about the event that is currently running
      const rsvp = reduce(
        map(values, (value, key) => {
          const emergencyContactFieldRegExp = /^emergency/;
          if (key.match(emergencyContactFieldRegExp)) {
            const newKey = camelcase(key.replace("emergency", ""));
            return {
              emergencyContact: {
                [newKey]: value
              }
            };
          }
          return { [key]: value };
        }),
        merge
      );
      this.props.submitRSVP(userId, eventId, rsvp);
    }
  }

  handleApplicationWithdraw() {
    const { user } = this.props;
    const userId = user._id;
    const eventId = user.events[0]; // TODO: Hack. Inform the dashboard about the event that is currently running
    this.props.withdrawApplication(userId, eventId);
  }

  renderCorrectStatus() {
    const { user, rsvpLoading, rsvpError } = this.props;
    const eventId = user.events[0]; // TODO: Hack. Inform the dashboard about the event that is currently running
    const application = user.applications.find(
      (application) => application.event === eventId
    );

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

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state),
    rsvpLoading: getRSVPLoading(state),
    rsvpError: getRSVPError(state),
    rsvpSubmitted: getRSVPSubmitted(state),
    withdrawError: getWithdrawError(state)
  };
}

export default connect(mapStateToProps, { submitRSVP, withdrawApplication })(
  HackerLanding
);
