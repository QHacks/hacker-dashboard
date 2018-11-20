import { Message, Grid, Step, Icon } from "semantic-ui-react";
import ArriveInformation from "./ArriveInformation";
import React, { Component } from "react";
import RSVPForm from "../Forms/RSVPForm";
import Emoji from "react-emoji-render";

class SuccessfulApplicant extends Component {
  renderStepInformation() {
    const {
      rsvpStatus,
      rsvpError,
      rsvpLoading,
      onWithdrawApplication,
      onSubmit
    } = this.props;

    const rsvpComplete = rsvpStatus === "COMPLETED";

    if (rsvpComplete) {
      return <ArriveInformation />;
    }

    return (
      <div>
        <Message positive>
          <Message.Header>
            <Emoji text="Congratulations, you've been accepted to QHacks! :tada:" />
          </Message.Header>
          <p>
            Please RSVP by Wednesday, January 24th, 2018 at 11:59PM to secure
            your spot. If you don't plan on coming, please withdraw your
            application to open your spot to someone else on the waiting list.
          </p>
        </Message>

        <RSVPForm
          onWithdrawApplication={onWithdrawApplication}
          onSubmit={onSubmit}
          rsvpLoading={rsvpLoading}
          rsvpError={rsvpError}
        />
      </div>
    );
  }

  renderStep() {
    const { rsvpStatus } = this.props;
    const rsvpComplete = rsvpStatus === "COMPLETED";

    return (
      <Step.Group fluid vertical>
        <Step completed>
          <Icon name="write" />
          <Step.Content>
            <Step.Title>Apply</Step.Title>
            <Step.Description>Apply for QHacks 2018!</Step.Description>
          </Step.Content>
        </Step>

        <Step completed>
          <Icon name="wait" />
          <Step.Content>
            <Step.Title>Wait</Step.Title>
            <Step.Description>Wait to hear back from us!</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={rsvpComplete} active={!rsvpComplete}>
          <Icon name="checked calendar" />
          <Step.Content>
            <Step.Title>RSVP</Step.Title>
            <Step.Description>Confirm your spot!</Step.Description>
          </Step.Content>
        </Step>

        <Step active={rsvpComplete}>
          <Icon name="code" />
          <Step.Content>
            <Step.Title>Arrive and Hack</Step.Title>
            <Step.Description>Show up to for a fun weekend!</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }

  render() {
    return (
      <Grid columns={2}>
        <Grid.Column width={5}>{this.renderStep()}</Grid.Column>
        <Grid.Column width={11}>{this.renderStepInformation()}</Grid.Column>
      </Grid>
    );
  }
}

export default SuccessfulApplicant;
