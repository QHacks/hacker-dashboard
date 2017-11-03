import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import React, { Component } from 'react';
import Login from '../Login/Login';

export default class App extends Component {
	render() {
		return (
			<div>
				<Button>Hello</Button>
				<Login />
			</div>
		);
	}
}
