import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default function MenuBar(props) {
	const { onLogoutClick } = props;
	return (
		<Menu stackable size='large'>
			<Menu.Item>
				<img src={require('../../assets/img/qhacks-tricolor-logo.svg')} />
			</Menu.Item>

			<Menu.Menu position='right'>
				<Menu.Item as='a' onClick={onLogoutClick}>
					Logout
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
}
