import { Landing as AdminLanding, Sidebar as AdminSidebar, Review, Settings } from '../Admin';
import { Landing as HackerLanding, Sidebar as HackerSidebar } from '../Hacker';
import { actionCreators, selectors } from '../../HackerStore';
import { Message, Segment, Sidebar } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import { AuthSwitch, NotFound } from '../utils';
import React, { Component } from 'react';
import MenuBar from '../utils/MenuBar';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import uuid from 'uuid/v4';

const { clearDashboardErrorMessage, clearDashboardSuccessMessage, logout, toggleSidebarVisibility } = actionCreators;
const {
    getDashboardErrorMessages,
    getDashboardSuccessMessages,
    getIsAdmin,
    getIsHacker,
    getIsPartner,
    getIsSidebarVisible
} = selectors;

class Dashboard extends Component {

    getCurrentAuthType() {
        const { isAdmin, isHacker, isPartner } = this.props;
        return (isAdmin && 'admin') || (isHacker && 'hacker') || (isPartner && 'partner');
    }

    handleLogoutClick() {
        this.props.logout();
    }

    handleDashboardClick() {
        this.props.logout();
    }

    handleProfileClick() {
        this.props.logout();
    }

    renderBody() {
        const authType = this.getCurrentAuthType();
        return (
            <AuthSwitch type={authType}>
                <PrivateRoute exact
                              path="/"
                              type="admin"
                              component={AdminLanding}/>
                <PrivateRoute exact
                              path="/review"
                              type="admin"
                              component={Review}/>
                <PrivateRoute exact
                              path="/settings"
                              type="admin"
                              component={Settings}/>
                <PrivateRoute exact
                              path="/"
                              type="hacker"
                              component={HackerLanding}/>
                <Route path="*"
                       component={NotFound}/>
            </AuthSwitch>
        );
    }

    renderDashboardSuccessMessages() {
        const { successMessages } = this.props;

        if (isEmpty(successMessages)) {
            return [];
        }

        return successMessages.map((message, index) => (
            <Message key={uuid()}
                     positive
                     floating
                     onDismiss={() => this.props.clearDashboardSuccessMessage({ index })}
                     content={message}/>
        ));
    }

    renderDashboardErrorMessages() {
        const { errorMessages } = this.props;

        if (isEmpty(errorMessages)) {
            return [];
        }

        return errorMessages.map((message, index) => (
            <Message key={uuid()}
                     negative
                     floating
                     onDismiss={() => this.props.clearDashboardErrorMessage({ index })}
                     content={message}/>
        ));
    }

    render() {
        return (
            <div style={{ height: '100vh' }}>
                <MenuBar onLogoutClick={this.handleLogoutClick.bind(this)}
                         onDashboardClick={this.handleDashboardClick.bind(this)}
                         onProfileClick={this.handleProfileClick.bind(this)}
                />
                <Segment basic>
                    {this.renderDashboardSuccessMessages()}
                    {this.renderDashboardErrorMessages()}
                    {this.renderBody()}
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        isAdmin: getIsAdmin(state),
        isHacker: getIsHacker(state),
        isPartner: getIsPartner(state),
        errorMessages: getDashboardErrorMessages(state),
        successMessages: getDashboardSuccessMessages(state)
    };
}

export default connect(mapStateToProps, {
    clearDashboardErrorMessage,
    clearDashboardSuccessMessage,
    logout
})(Dashboard);
