import { selectors, actionCreators } from '../../HackerStore';
import ApplicationSubmitted from './ApplicationSubmitted';
import ApplicationWithdrawn from './ApplicationWithdrawn';
import SuccessfulApplicant from './SuccessfulApplicant';
import WaitlistedApplicant from './WaitlistedApplicant';
import DeclinedApplicant from './DeclinedApplicant';
import ArriveInformation from './ArriveInformation';
import { Container } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const { getUser, getRSVPLoading, getRSVPError, getRSVPSubmitted } = selectors;
const { submitRSVP } = actionCreators;

class HackerLanding extends Component {

    renderCorrectStatus() {
        const { user } = this.props;
        console.log(user);

        switch (user.applicationStatus) {
            case 'APPLIED':
                return <ApplicationSubmitted />;
            case 'REJECTED':
                return <DeclinedApplicant />;
            case 'WAITING_LIST':
                return <WaitlistedApplicant />;
            case 'WITHDRAWN':
                return <ApplicationWithdrawn />;
            case 'ACCEPTED':
                return <SuccessfulApplicant rsvpStatus={user.rsvp} />;
        }
    }

    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                {this.renderCorrectStatus()}
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: getUser(state),
        rsvpLoading: getRSVPLoading(state),
        rsvpError: getRSVPError(state),
        rsvpSubmitted: getRSVPSubmitted(state)
    };
}

export default connect(mapStateToProps, { submitRSVP })(HackerLanding);
