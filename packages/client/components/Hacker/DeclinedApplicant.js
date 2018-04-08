import { Header, Segment } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
	<Segment>
		<Header as='h2'><Emoji text="Thank you from QHacks! :heart:"/></Header>
		<p>This years applicant pool was the best yet, making our decision-making process harder than ever. Unfortunately, we will be unable to offer you a spot at QHacks 2018.</p>
		<p>That being said, don't let this get you down! There are plenty of other great hackathons that you can attend. Check out the <a href="https://mlh.io/">Major League Hacking website</a> for more information and please make sure to apply again next year for QHacks 2019.</p>
		<p>We are also looking for volunteers to help at QHacks. This is a great opportunity to meet other people interested in technology and innovation, as well as getting most of the same benefits as hackers at the event. To be a volunteer, please fill out this <a href="https://qhacks.typeform.com/to/WK3MBv">Typeform</a>.</p>
		<p>If you have any questions, you can reach out to us at <a href="mailto:hello@qhacks.io">hello@qhacks.io</a>.</p>
		<p>We wish all the best and keep hacking!</p>
	</Segment>
);
