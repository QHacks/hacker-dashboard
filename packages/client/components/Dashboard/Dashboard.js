import { CheckIn, Landing as AdminLanding, Review } from '../Admin';
import { Applicants, Settings } from '../SuperAdmin';
import { actionCreators, selectors } from '../../HackerStore';
import { Message, Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
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
const {
    getDashboardErrorMessages,
    getDashboardSuccessMessages,
    getIsAdmin,
    getIsHacker,
    getIsPartner,
    getIsSuperAdmin,
    getUser
} = selectors;

class Dashboard extends Component {

    handleLogoutClick() {
        this.props.logout();
    }

    renderMenuBar() {
        const { isAdmin, isSuperAdmin } = this.props;
        return (
            <MenuBar onLogoutClick={this.handleLogoutClick.bind(this)}
                     isAdmin={isAdmin}
                     isSuperAdmin={isSuperAdmin}/>
        );
    }

    renderBody() {
        const { isAdmin, isPartner, isHacker, isSuperAdmin } = this.props;
        const authType = (isAdmin && 'admin') || (isPartner && 'partner') || (isHacker && 'hacker') || (isSuperAdmin && 'superAdmin');
        return (
            <AuthSwitch type={authType}>
                <PrivateRoute exact
                              path="/"
                              types={['admin', 'superAdmin']}
                              component={AdminLanding}/>
                <PrivateRoute exact
                              path="/review"
                              types={['admin', 'superAdmin']}
                              component={Review}/>
                <PrivateRoute exact
                              path="/check-in"
                              types={['admin', 'superAdmin']}
                              component={CheckIn}/>
                <PrivateRoute exact
                              path="/applicants"
                              types={['superAdmin']}
                              component={Applicants}/>
                <PrivateRoute exact
                              path="/settings"
                              types={['superAdmin']}
                              component={Settings}/>
                <PrivateRoute exact
                              path="/profile"
                              types={['hacker', 'partner', 'admin', 'superAdmin']}
                              component={Profile}/>
                <PrivateRoute exact
                              path="/"
                              types={['hacker']}
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
                     content={message}
                     style={{ marginTop: '3em' }}
            />
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
                     content={message}
                     style={{ marginTop: '3em' }}
            />
        ));
    }

    renderConfetti() {
        const { user } = this.props;

        if (user.role !== 'HACKER') return null;

        const eventId = user.events[0]; // TODO: Hack. Inform the dashboard about the event that is currently running
        const application = user.applications.find((application) => application.event === eventId);
        const shouldRun = (application.status === 'ACCEPTED') && (application.rsvp === 'PENDING');
        if (shouldRun) {
            return (
                <Confetti {...this.props.size} numberOfPieces={400} recycle={false}/>
            );
        }
        return null;
    }

    render() {
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
        isSuperAdmin: getIsSuperAdmin(state),
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
