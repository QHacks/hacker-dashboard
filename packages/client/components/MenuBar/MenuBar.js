import { Menu, Button, Dropdown } from 'semantic-ui-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuBar extends Component {

	renderQHacksCrown() {
		return (
			<svg width="77px" height="40px" viewBox="0 0 77 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<g id="Logo-1">
						<polygon id="Fill-13" fill="#FEDB00" points="24.0956784 31.8966845 25.6447918 33.4941278 37.0012454 36.9761897 30.3740289 29.5474062"></polygon>
						<polygon id="Fill-15" fill="#C8102E" points="46.5608907 29.5503258 39.9176742 36.9747381 51.3238598 33.4882227 52.8641485 31.8996041"></polygon>
						<polygon id="Fill-17" fill="#C8102E" points="35.4125856 15.9428041 31.2915134 28.8410309 37.8746887 36.2214021 37.8746887 21.0370722 36.2464825 15.9442887"></polygon>
						<polygon id="Fill-19" fill="#001F5B" points="40.6532866 15.9458144 39.0265649 21.0370309 39.0265649 36.2390928 45.6493278 28.8409897 41.5267711 15.9428454"></polygon>
						<polygon id="Fill-21" fill="#001F5B" points="67.0959835 20.5475794 65.7330144 20.2881979 53.6057567 32.7906309 60.0247258 30.8282392 63.7354887 38.7876619 67.7539629 25.9465897"></polygon>
						<polygon id="Fill-23" fill="#C8102E" points="49.9741196 14.7543258 44.6762227 8.41139794 42.2419134 10.9746969 41.0226144 14.7916866"></polygon>
						<polygon id="Fill-25" fill="#FEDB00" points="66.6372206 16.7943093 63.059901 11.622433 57.0746639 17.4669691 66.947901 19.3458144"></polygon>
						<polygon id="Fill-27" fill="#FEDB00" points="40.9097567 37.8775258 63.0217567 39.9835052 59.4048495 32.2249897"></polygon>
						<polygon id="Fill-29" fill="#C8102E" points="76.9208825 7.16651546 66.9743258 10.0212784 68.5922227 23.2997938"></polygon>
						<polygon id="Fill-31" fill="#C8102E" points="11.2349113 20.2881814 9.87416907 20.5475629 9.21684948 25.9465732 13.2338392 38.7876454 16.9453443 30.8282227 23.3600247 32.7935835"></polygon>
						<polygon id="Fill-33" fill="#001F5B" points="35.8786309 14.7909361 34.6241155 10.8647505 32.2938887 8.41138969 26.9959918 14.7543175"></polygon>
						<polygon id="Fill-35" fill="#FEDB00" points="10.0206928 19.3458144 19.8954969 17.4669691 13.9102598 11.622433 10.3314557 16.7943093"></polygon>
						<polygon id="Fill-37" fill="#001F5B" points="36.0061196 37.8775258 17.5660371 32.2249897 13.9483052 39.9835052"></polygon>
						<polygon id="Fill-39" fill="#001F5B" points="0.0484865979 7.16651546 8.37788866 23.2997938 9.99578557 10.0212784"></polygon>
						<polygon id="Fill-41" fill="#FEDB00" points="33.9558515 4.98651546 38.4491299 19.0512577 42.9453773 4.98651546 38.4491299 0.0564536082"></polygon>
					</g>
				</g>
			</svg>
		);
	}

	renderLeftSideMenu() {
		return (
			<Menu.Menu position="left">
				<Menu.Item as={Link} to="/">
					{this.renderQHacksCrown()}
				</Menu.Item>
				<Menu.Item as={Link} to="/">
					Home
				</Menu.Item>
			</Menu.Menu>
		);
	}

	renderRightSideMenu() {
		const { onLogoutClick } = this.props;
		return (
			<Menu.Menu position="right">
				{this.renderAdminMenu()}
				{this.renderSuperAdminMenu()}
				<Menu.Item as={Link} to="/profile">
					Profile
				</Menu.Item>
				<Menu.Item>
					<Button primary onClick={onLogoutClick}>Logout</Button>
				</Menu.Item>
			</Menu.Menu>
		);
	}

	renderAdminMenu() {
		const { isAdmin, isSuperAdmin } = this.props;
		if (isAdmin || isSuperAdmin) {
			return (
				<Dropdown item text="Admin">
					<Dropdown.Menu>
						<Dropdown.Item as={Link} to="/check-in">Check In</Dropdown.Item>
						<Dropdown.Item as={Link} to="/review">Review</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			);
		}
		return null;
	}

	renderSuperAdminMenu() {
		const { isSuperAdmin } = this.props;
		if (isSuperAdmin) {
			return (
				<Dropdown item text="Super Admin">
					<Dropdown.Menu>
						<Dropdown.Item as={Link} to="/applicants">Applicants</Dropdown.Item>
						<Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			);
		}
		return null;
	}

	render() {
		return (
			<Menu stackable size="large" style={{ margin: 0 }}>
				{this.renderLeftSideMenu()}
				{this.renderRightSideMenu()}
			</Menu>
		);
	}
}

export default MenuBar;
