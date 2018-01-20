import { Landing as AdminLanding, Review, Settings } from '../Admin';
import { actionCreators, selectors } from '../../HackerStore';
import { Message, Segment, Sidebar, Container } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Landing as HackerLanding } from '../Hacker';
import PrivateRoute from '../utils/PrivateRoute';
import { AuthSwitch, NotFound } from '../utils';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Confetti from 'react-confetti';
import sizeMe from 'react-sizeme';
import { isEmpty } from 'lodash';
import Profile from '../Profile';
import MenuBar from '../MenuBar';
import uuid from 'uuid/v4';

const { clearDashboardErrorMessage, clearDashboardSuccessMessage, logout } = actionCreators;
const { getDashboardErrorMessages, getDashboardSuccessMessages, getIsAdmin, getIsHacker, getIsPartner, getUser } = selectors;

class Dashboard extends Component {

    handleLogoutClick() {
        this.props.logout();
    }

    renderMenuBar() {
        const { isAdmin } = this.props;
        return (
            <MenuBar onLogoutClick={this.handleLogoutClick.bind(this)} isAdmin={isAdmin} />
        );
    }

    renderBody() {
        const { isAdmin, isPartner, isHacker } = this.props;
        const authType = (isAdmin && 'admin') || (isPartner && 'partner') || (isHacker && 'hacker');
        return (
            <AuthSwitch type={authType}>
                <PrivateRoute exact
                              path="/"
                              types={["admin"]}
                              component={AdminLanding}/>
                <PrivateRoute exact
                              path="/review"
                              types={["admin"]}
                              component={Review}/>
                <PrivateRoute exact
                              path="/settings"
                              types={["admin"]}
                              component={Settings}/>
                <PrivateRoute exact
                              path="/profile"
                              types={["hacker", "partner", "admin"]}
                              component={Profile}/>
                <PrivateRoute exact
                              path="/"
                              types={["hacker"]}
                              component={HackerLanding}/>
                <Route path="*" component={NotFound}/>
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

    renderConfetti() {
        const { user } = this.props;
        const shouldRun = (user.applicationStatus === 'ACCEPTED') && (user.rsvpStatus === 'PENDING');
        if (shouldRun) {
            return (
                <Confetti {...this.props.size} numberOfPieces={400} recycle={false} />
            );
        }
        return null;
    }

    render() {
        const { width, height } = this.props.size;
        console.log(width, height);
        return (
            <div style={{ height: '100vh' }}>
                {this.renderMenuBar()}
                <Container>
                    {this.renderConfetti()}
                    {this.renderDashboardSuccessMessages()}
                    {this.renderDashboardErrorMessages()}
                    {this.renderBody()}
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        user: getUser(state),
        isAdmin: getIsAdmin(state),
        isHacker: getIsHacker(state),
        isPartner: getIsPartner(state),
        errorMessages: getDashboardErrorMessages(state),
        successMessages: getDashboardSuccessMessages(state)
    };
}

Dashboard = connect(mapStateToProps, {
    clearDashboardErrorMessage,
    clearDashboardSuccessMessage,
    logout
})(Dashboard);

export default sizeMe({ monitorHeight: true })(Dashboard);
