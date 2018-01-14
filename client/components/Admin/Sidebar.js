import { Sidebar, SidebarItem } from '../Dashboard';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

export default ({ ...props }) => (
    <Sidebar {...props}>
        <SidebarItem name="home"
                     to="/">
            <Icon name="home"/>
            Home
        </SidebarItem>
        <SidebarItem name="review"
                     to="/review">
            <Icon name="users"/>
            Review Applications
        </SidebarItem>
        <SidebarItem name="settings"
                     to="/settings">
            <Icon name="cogs"/>
            Settings
        </SidebarItem>
    </Sidebar>
);
