import { actionCreators } from '../../HackerStore';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import Emoji from 'react-emoji-render';
import { connect } from 'react-redux';

const { logout, getUsers } = actionCreators;

class Dashboard extends Component {

	handleUsersClick() {
		this.props.getUsers();
	}

	handleLogoutClick() {
		this.props.logout();
	}

	render() {
		return (
			<div>
				<Menu stackable size='large'>
					<Menu.Item>
						<img src={require('../../assets/img/qhacks-tricolor-logo.svg')} />
					</Menu.Item>

					<Menu.Menu position='right'>
						<Menu.Item>
							Logout
						</Menu.Item>
					</Menu.Menu>
				</Menu>

				<Container text style={{ marginTop: '3em' }}>
					<Segment raised>
						<Header as='h2'><Emoji text="Congratulations, your application is in! :tada: :heart:" /></Header>
						<p>Your application to attend QHacks 2018 has been submitted! So, what are the next steps? </p>
						<p>We will be accepting applications until January 8th 2018, later on that week we will be sending emails to all of the applicants letting them know their application status.</p>
						<p>If you are accepted, the next step will be to have you RSVP right here in the dashboard, you must complete this step within one week of receiving your acceptance letter. The RSVP confirms that you will be attending and provides us with more information about you to make your experience the best it can be. Some of the information we'll ask you for are things like t-shirt size, dietary restrictions, workshops you are interested in attending, actvities you might be interested in and much more.</p>
						<p>What if I don't get accepted? We'll have a waiting list that you can enter into from the dashboard and it will be a first come first serve basis. We really wish that we could accept everyone but we receive thousands of applications and just do not have the infrastructure to maintain the quality and safety of our event. Every year there are always those applicants that reach out to us asking if there is anything we can do to help them and our advice is to just make sure you are looking for that email and jump on the waiting list as soon as you can, we can't make any exceptions because it wouldn't be fair.</p>
						<p>While you wait to hear from us there are some things you can do, such as:</p>
						<ul>
							<li>Like us on <a href="">Facebook</a></li>
							<li>Follow us on <a href="">Twitter</a></li>
							<li>Follow us on <a href="">Instagram</a></li>
						</ul>
						<p>We will be having contests for free tech on our social media so do not miss out! <Emoji text=":watch: :iphone:" /></p>
						<p>Finally, we want to say thank you for your excitement about QHacks! With the participation of people like you, we can all continue towards our goal of making Queen’s and Canada recognized for its talent and enthusiasm for innovation and creation.</p>
					</Segment>
				</Container>
			</div>
		);
	}
}

export default connect((state) => state, { logout, getUsers })(Dashboard);
