import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import HackerApplication from './HackerApplication';
import ReviewScale from './ReviewScale';
import { actionCreators } from '../../HackerStore/HackerActions';
import { selectors } from '../../HackerStore/HackerReducer';

const { fetchApplicationToReview, submitApplicationReview } = actionCreators;
const { getApplicationToReview, getUser } = selectors;

class Review extends Component {
    componentDidMount() {
        this.props.fetchApplicationToReview();
    }

    handleVote(score, options = {}) {
        const { _id: performedBy, reviewGroup: group } = this.props.user;
        const { goldenTicket = false } = options;
        const review = {
            goldenTicket,
            group,
            performedBy,
            score
        };
        const { _id: userId } = this.props.applicationToReview;
        this.props.submitApplicationReview(userId, review);
    }

    render() {
        const { applicationToReview } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Segment compact>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HackerApplication application={applicationToReview}/>
                        <ReviewScale onVote={this.handleVote.bind(this)}/>
                    </div>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        applicationToReview: getApplicationToReview(state),
        user: getUser(state)
    };
}

export default connect(mapStateToProps, { fetchApplicationToReview, submitApplicationReview })(Review);
