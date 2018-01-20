import { Header, Segment } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
    <Segment>
        <Header as='h2'><Emoji text="Thank you from QHacks! :heart:"/></Header>
        <p>While its too bad that you wont be joining us, we want to say thank you for applying! We understand that things come up last minute, just know that we loved your application and that someone on the waiting list will be happy that you have chosen to withdraw your position.</p>
        <p>We wish you all the best and keep hacking!</p>
    </Segment>
);
