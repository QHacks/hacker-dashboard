import { actionCreators } from '../../HackerStore';
import { Button } from 'semantic-ui-react';
import React, { Component } from 'react';
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
				<p>Welcome to the QHacks Dashboard!</p>
				<Button onClick={this.handleLogoutClick.bind(this)}>Logout</Button>
				<Button onClick={this.handleUsersClick.bind(this)}>Get Users</Button>
			</div>
		);
	}
}

export default connect(state => state, { logout, getUsers })(Dashboard);
