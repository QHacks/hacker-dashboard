import { actionCreators, selectors } from '../../HackerStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuBar from '../utils/MenuBar';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import { Landing as AdminLanding, Sidebar as AdminSidebar, Review, Settings } from '../Admin';
import { Landing as HackerLanding, Sidebar as HackerSidebar } from '../Hacker';
import { AuthSwitch, NotFound } from '../utils';
import { Message, Segment, Sidebar } from 'semantic-ui-react';
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

    handleBarsClick() {
        this.props.toggleSidebarVisibility();
    }

    handleLogoutClick() {
        this.props.logout();
    }

    renderSidebar() {
        const { isSidebarVisible } = this.props;
        const authType = this.getCurrentAuthType();
        return (
            <AuthSwitch type={authType}>
                <PrivateRoute path="*"
                              type="admin"
                              component={() => <AdminSidebar visible={isSidebarVisible}/>}/>
                <PrivateRoute path="*"
                              type="hacker"
                              component={() => <HackerSidebar visible={isSidebarVisible}/>}/>
            </AuthSwitch>
        );
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
                <MenuBar onBarsClick={this.handleBarsClick.bind(this)}
                         onLogoutClick={this.handleLogoutClick.bind(this)}/>
                <Sidebar.Pushable>
                    {this.renderSidebar()}
                    <Sidebar.Pusher>
                        <Segment basic>
                            {this.renderBody()}
                        </Segment>
                        {this.renderDashboardSuccessMessages()}
                        {this.renderDashboardErrorMessages()}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        errorMessages: getDashboardErrorMessages(state),
        isAdmin: getIsAdmin(state),
        isHacker: getIsHacker(state),
        isPartner: getIsPartner(state),
        isSidebarVisible: getIsSidebarVisible(state),
        successMessages: getDashboardSuccessMessages(state)
    };
}

export default connect(mapStateToProps, {
    clearDashboardErrorMessage,
    clearDashboardSuccessMessage,
    logout,
    toggleSidebarVisibility
})(Dashboard);
