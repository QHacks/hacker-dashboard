import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default function MenuBar({ onBarsClick, onLogoutClick }) {
    return (
        <Menu stackable size="large" style={{ margin: 0 }}>
            <Menu.Item icon="bars"
                       as="a"
                       onClick={onBarsClick}/>
            <Menu.Item>
                <img src={require('../../assets/img/qhacks-tricolor-logo.svg')}/>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item as="a"
                           onClick={onLogoutClick}>
                    Logout
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
