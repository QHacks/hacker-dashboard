import React, { Component } from 'react';
import { Segment, Tab, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { map } from 'lodash';
import HackerApplication from './HackerApplication';
import ReviewScale, { SCORES } from './ReviewScale';
import { actionCreators } from '../../HackerStore/HackerActions';
import { selectors } from '../../HackerStore/HackerReducer';

const { fetchApplicationToReview, fetchApplicationsWithReviews, fetchSettings, submitApplicationReview } = actionCreators;
const { getApplicationToReview, getApplicationsWithReviews, getSettings, getUser } = selectors;

const { YES_SCORE } = SCORES;
const REVIEW_TABLE_HEADERS = [
    'First Name',
    'Last Name',
    'Score',
    'Golden Ticket Recipient?',
    'Is Application Complete?'
];

class Review extends Component {
    componentDidMount() {
        // TODO: load on tab change
        // TODO: paginate
        this.props.fetchSettings();
        this.props.fetchApplicationToReview();
        this.props.fetchApplicationsWithReviews();
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

    renderApplicationToReview() {
        const { applicationToReview } = this.props;
        return (
            <Segment compact>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <HackerApplication application={applicationToReview}/>
                    <ReviewScale onVote={this.handleVote.bind(this)}/>
                </div>
            </Segment>
        );
    }

    renderViewReviews() {
        const { applicationsWithReviews, settings } = this.props;

        const { numberOfReviewsRequired } = settings;
        const maxScore = numberOfReviewsRequired * YES_SCORE;

        const applications = applicationsWithReviews.map((application) => {
            const { firstName, lastName, reviews } = application;
            const score = Math.round(reviews.reduce((score, review) => score + review.score, 0) / reviews.length * numberOfReviewsRequired);
            const hasGoldenTicket = score > maxScore;
            return {
                firstName,
                lastName,
                score,
                hasGoldenTicket,
                isApplicationComplete: hasGoldenTicket || (application.reviews.length >= numberOfReviewsRequired)
            };
        }).sort((a, b) => b.score - a.score);


        return (
            <Segment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {REVIEW_TABLE_HEADERS.map((header) => (
                                <Table.HeaderCell key={uuid()}>{header}</Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {applications.map((application) => (
                            <Table.Row key={uuid()}>
                                {map(application, (value, key) => (
                                    <Table.Cell key={uuid()}
                                                positive={key.match(/(is|has)/) && value}
                                                negative={key.match(/(is|has)/) && !value}>
                                        {String(value)}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        );
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Tab panes={[
                    { menuItem: 'Review Applications', render: this.renderApplicationToReview.bind(this) },
                    { menuItem: 'View Reviews', render: this.renderViewReviews.bind(this) }
                ]}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        applicationToReview: getApplicationToReview(state),
        applicationsWithReviews: getApplicationsWithReviews(state),
        settings: getSettings(state),
        user: getUser(state)
    };
}

export default connect(mapStateToProps, {
    fetchApplicationToReview,
    fetchApplicationsWithReviews,
    fetchSettings,
    submitApplicationReview
})(Review);
