import { actionCreators } from '../../HackerStore';
import { Button } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';


const { logout } = actionCreators;

class Dashboard extends Component {

	handleLogoutClick() {
		const { logout } = this.props;

		logout();
	}

	render() {
		return (
			<div>
				<p>Welcome to the QHacks Dashboard!</p>
				<Button onClick={this.handleLogoutClick.bind(this)}>Logout</Button>
			</div>
		);
	}
}

export default connect(state => state, { logout })(Dashboard);
