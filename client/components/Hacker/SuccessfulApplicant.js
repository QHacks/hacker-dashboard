import { Header, Segment, Grid, Step, Icon, Button } from 'semantic-ui-react';
import ArriveInformation from './ArriveInformation';
import React,  { Component } from 'react';
import RSVPForm from '../Forms';

class SuccessfulApplicant extends Component {

    renderStepInformation() {
        const { rsvpStatus, rsvpError, rsvpLoading, onWithdrawApplication, onSubmitRSVP } = this.props;
        const rsvpComplete = (rsvpStatus === 'COMPLETED');

        if (rsvpComplete) {
            return (
                <ArriveInformation />
            );
        }
        return (
            <RSVPForm onWithdrawApplication={onWithdrawApplication}
                      onSubmitRSVP={onSubmitRSVP}
                      rsvpLoading={rsvpLoading}
                      rsvpError={rsvpError}
            />
        );
    }

    renderStep() {
        const { rsvpStatus } = this.props;
        const rsvpComplete = (rsvpStatus === 'COMPLETED');

        return (
            <Step.Group fluid vertical>
                <Step completed>
                    <Icon name='write' />
                    <Step.Content>
                      <Step.Title>Apply</Step.Title>
                      <Step.Description>Apply for QHacks 2018!</Step.Description>
                    </Step.Content>
                </Step>

                <Step>
                    <Icon name='wait' />
                    <Step.Content>
                      <Step.Title>Wait</Step.Title>
                      <Step.Description>Wait to hear back regarding application!</Step.Description>
                    </Step.Content>
                </Step>

                <Step completed={!rsvpComplete} active={!rsvpComplete}>
                    <Icon name='checked calendar' />
                    <Step.Content>
                      <Step.Title>RSVP</Step.Title>
                      <Step.Description>Confirm your spot!</Step.Description>
                    </Step.Content>
                </Step>

                <Step completed={rsvpComplete} active={rsvpComplete}>
                  <Icon name='code' />
                  <Step.Content>
                    <Step.Title>Arrive and Hack</Step.Title>
                    <Step.Description>Show up to for a fun weekend!</Step.Description>
                  </Step.Content>
                </Step>
            </Step.Group>
        );
    }

    render() {
        <Grid columns={2}>
            <Grid.Column width={5}>
              {this.renderStep()}
            </Grid.Column>
            <Grid.Column width={11}>
              {this.renderStepInformation()}
            </Grid.Column>
        </Grid>;
    }
}

export default SuccessfulApplicant;
