import { Container, Header, Segment, Grid, Step, Icon, Button } from 'semantic-ui-react';
import React, { Component } from 'react';
import Emoji from 'react-emoji-render';
import RSVPForm from '../utils/RSVPForm';

class HackerLanding extends Component {

    renderDeclinedApplicant() {

    }

    renderWaitlistedApplicant() {

    }

    renderSuccessfulApplicant() {
        return (
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
    }

    renderApplicationIn() {
        return (
            <Container fluid style={{ marginTop: '3em' }}>
                <Segment raised>
                    <Header as='h2'><Emoji text="Congratulations, your application is in! :tada: :heart:"/></Header>
                    <p>Your application to attend QHacks 2018 has been submitted! So, what are the next steps? </p>
                    <p> We will be accepting applications until January 8th 2018. Later that week we will be sending
                        emails to all of the applicants updating them on their application status.</p>
                    <p>If you are accepted, your next step will be to RSVP right here in the dashboard. You must
                        complete this step within one week of receiving your acceptance email. The RSVP will be used
                        to confirm your attendance to QHacks 2018.</p>
                    <p>What if I don't get accepted? There's a chance you may be added to the waitlist. If someone
                        who has been accepted fails to RSVP or cant come to the event, then we will fill their spot
                        with someone from the waitlist.</p>
                    <p>While you wait to hear from us there are some things you can do, such as:</p>
                    <ul>
                        <li>Like us on <a href="https://www.facebook.com/QHacks/">Facebook</a></li>
                        <li>Follow us on <a href="https://twitter.com/QHacks18">Twitter</a></li>
                        <li>Follow us on <a href="https://www.instagram.com/qhacks18/">Instagram</a></li>
                    </ul>
                    <p>We will be having contests for free tech on our social media so do not miss out! <Emoji
                        text=":watch: :iphone:"/></p>
                    <p>Finally, we want to say thank you for your excitement about QHacks! With the participation of
                        people like you, we can all continue towards our goal of making Queen’s and Canada as a
                        whole recognized for its talent and enthusiasm for innovation and creation.</p>
                </Segment>
            </Container>
        );
    }

    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                {this.renderSuccessfulApplicant()}
            </Container>
        );
    }
}


export default HackerLanding;
