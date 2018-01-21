import { Header, Segment } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
    <Segment>
        <Header as='h2'><Emoji text="You are on the waiting list! :heart: :honeybee:"/></Header>
        <p>This years applicant pool was the best yet, making our decision-making process harder than ever.</p>
        <p>We've had to place you on the waitlist, but don't fret! We'll be accepting people from our waitlist as spots open up, so keep an eye on your inbox!</p>
        <p>Stay tuned for more information!</p>
    </Segment>
);
