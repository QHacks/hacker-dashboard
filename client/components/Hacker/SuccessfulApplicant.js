import { Header, Segment, Grid, Step, Icon, Button } from 'semantic-ui-react';
import RSVPForm from '../Forms';
import React from 'react';

export default () => (
    <Grid columns={2}>
        <Grid.Column width={5}>
          <Step.Group fluid vertical>
            <Step completed>
              <Icon name='truck' />
              <Step.Content>
                <Step.Title>Apply</Step.Title>
                <Step.Description>Apply for QHacks 2018!</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='checked calendar' />
              <Step.Content>
                <Step.Title>RSVP</Step.Title>
                <Step.Description>Confirm your spot!</Step.Description>
              </Step.Content>
            </Step>

          <Step>
            <Icon name='code' />
            <Step.Content>
              <Step.Title>Arrive and Hack</Step.Title>
              <Step.Description>Show up to for a fun weekend!</Step.Description>
            </Step.Content>
          </Step>
          </Step.Group>
        </Grid.Column>

        <Grid.Column width={11}>
          <RSVPForm />
        </Grid.Column>
    </Grid>
);
