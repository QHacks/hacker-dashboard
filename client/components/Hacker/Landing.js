import { Container, Header, Segment } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
    <Container text style={{ marginTop: '3em' }}>
        <Segment raised>
            <Header as='h2'><Emoji text="Congratulations, your application is in! :tada: :heart:"/></Header>
            <p>Your application to attend QHacks 2018 has been submitted! So, what are the next steps? </p>
            <p> We will be accepting applications until January 8th 2018. Later that week we will be sending
                emails to all of the applicants updating them on their application status.</p>
            <p>If you are accepted, your next step will be to RSVP right here in the dashboard. You must
                complete this step within one week of receiving your acceptance email. The RSVP will be used
                to confirm your attendance to QHacks 2018.</p>
            <p>What if I don't get accepted? There's a chance you may be added to the waitlist. If someone
                who has been accepted fails to RSVP or can't come to the event, then we will fill their spot
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
