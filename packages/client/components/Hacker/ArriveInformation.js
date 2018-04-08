import { Header, Segment, Item } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
	<div>
		<Segment>
			<Header as='h2'><Emoji text="Your spot is confirmed! :smiley: :fire:"/></Header>
			<p>Yay! It's confirmed, you're coming to QHacks 2018. Now, what can you do in the meantime? Start thinking
				about stuff you'd like to build and make sure you do all of the stuff listed below. That way you can
				stay the most informed.</p>
			<p>As outlined in your acceptance email, we have buses traveling from <b>Toronto, Waterloo, Montreal and Ottawa</b>.
				In order to reserve a spot on one of the buses, you must email <a href="mailto:travel@qhacks.io">travel@qhacks.io</a>.
				The buses will be filled on a <b>first-come-first-serve basis</b>, so make sure to send us an email as soon as
				possible.</p>

			<p>If you are travelling to QHacks from a location other than the ones listed above, we will be offering
				travel reimbursements. Please email <a href="mailto:travel@qhacks.io">travel@qhacks.io</a> for more
				information.</p>
			<p>A few things to note before you arrive:</p>
			<ul>
				<li>Teams are allowed to be groups of 1 to 4 people.</li>
				<li>You have 36 hours to build whatever you desire.</li>
				<li>Registration and dinner will run from 5:00 PM to 8:00 PM on Friday, February 2nd. A full schedule
					will be released in the coming days along with a hacker package outlining some important
					information.
				</li>
				<li>You're going to have a blast!</li>
			</ul>
			<p>We can't wait to see you at QHacks! If you have any questions at all, please don't hesitate to email <a
				href="mailto:hello@qhacks.io">hello@qhacks.io</a>.</p>
			<Item.Group>
				<Item>
					<Item.Image size='mini' src={require('../../assets/img/slack.svg')}/>
					<Item.Content verticalAlign='middle'>
						<Item.Header as='a'
												 href="https://join.slack.com/t/qhacks2018/shared_invite/enQtMzAwNTkyNTU3NjY1LWExOTkzZmNiODNiNGM4MDZhOTMzNjM3MWYxMjdhZmZhZmZiNzEwODAzY2U2MDM2YzE0YzgwM2UxZWQyZmM2NTE">Join
							the QHacks 2018 Slack!</Item.Header>
						<Item.Description>
							This will be the primary method our team (and our partners) will communicate with
							you before and during the event! Make sure to join to stay up to date.
						</Item.Description>
					</Item.Content>
				</Item>
				<Item>
					<Item.Image size='mini' src={require('../../assets/img/devpostLogo.png')}/>
					<Item.Content verticalAlign='middle'>
						<Item.Header as='a' href="https://qhacks2018.devpost.com/">Check out the QHacks 2018
							Devpost!</Item.Header>
						<Item.Description>
							Devpost is where you will submit your projects at the end of the weekend. More information
							like prizes, judges and our partners will be posted here in the coming days.
						</Item.Description>
					</Item.Content>
				</Item>
				<Item>
					<Item.Image size='mini' src={require('../../assets/img/twitter.svg')}/>
					<Item.Content verticalAlign='middle'>
						<Item.Header as='a' href="https://twitter.com/qhacks18?lang=en">Follow QHacks on Twitter for
							giveaways!</Item.Header>
						<Item.Description>
							We will be having giveaways on Twitter before and during the event, so make sure
							you give us a follow. You won't want to miss out!
						</Item.Description>
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
	</div>
);
