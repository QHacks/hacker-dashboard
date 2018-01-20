import { Header, Segment } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
    <Segment raised>
        <Header as='h2'><Emoji text="Thank you from QHacks! :heart:"/></Header>
        <p>This years applicant pool was the best yet, making our decision-making process harder than ever. Unfortunately, we will be unable to offer you a spot at QHacks 2018.</p>
        <p>That being said, dont let this get you down! There are plenty of other great hackathons that you can attend. Check out MLH for more information. Make sure to apply again next year for QHacks 2019.</p>
        <p>We are also looking for volunteers to help with event logistics for QHacks. This is a great opportunity to meet other people interested in technology and innovation, as well as getting most of the same benefits as hackers at the event. To be a volunteer, please fill our this Typeform.</p>
        <p>If you have any questions, you can reach out to us at hello@qhacks.io. Keep hacking!</p>
    </Segment>
);
