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

const { submitRSVP, withdrawApplication } = actionCreators;
const { getUser, getRSVPLoading, getRSVPError, getRSVPSubmitted, getWithdrawError } = selectors;

class HackerLanding extends Component {

    handleSubmitRSVP(formData) {
        this.props.submitRSVP(formData);
    }

    handleApplicationWithdraw() {
        this.props.withdrawApplication();
    }

    renderCorrectStatus() {
        const { user, rsvpLoading, rsvpError } = this.props;

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
                return (
                    <SuccessfulApplicant rsvpStatus={user.rsvpStatus}
                                         onSubmitRSVP={this.handleSubmitRSVP.bind(this)}
                                         onWithdrawApplication={this.handleApplicationWithdraw.bind(this)}
                                         rsvpLoading={rsvpLoading}
                                         rsvpError={rsvpError}
                    />
                    );
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
        rsvpSubmitted: getRSVPSubmitted(state),
        withdrawError: getWithdrawError(state)
    };
}

export default connect(mapStateToProps, { submitRSVP, withdrawApplication })(HackerLanding);
