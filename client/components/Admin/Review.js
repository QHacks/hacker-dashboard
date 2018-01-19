import React, { Component } from 'react';
import { Button, Icon, Menu, Segment, Tab, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { head, isEmpty, map } from 'lodash';
import HackerApplication from './HackerApplication';
import ReviewScale, { SCORES } from './ReviewScale';
import { actionCreators } from '../../HackerStore/HackerActions';
import { selectors } from '../../HackerStore/HackerReducer';

const {
    fetchApplicationToReview,
    fetchApplicationsWithReviews,
    fetchApplicationsWithReviewsCount,
    fetchSettings,
    setReviewTablePage,
    submitApplicationReview,
    updateApplicationStatus
} = actionCreators;
const {
    getApplicationToReview,
    getApplicationsWithReviews,
    getApplicationsWithReviewsCount,
    getReviewTablePage,
    getSettings,
    getUser
} = selectors;

const { YES_SCORE } = SCORES;
const REVIEW_TABLE_APPLICATIONS_PER_PAGE = 20;
const REVIEW_TABLE_FETCH_DEFAULT_SETTINGS = { limit: REVIEW_TABLE_APPLICATIONS_PER_PAGE };
const REVIEW_TABLE_HEADERS = [
    'First Name',
    'Last Name',
    'Score',
    'Golden Ticket Recipient?',
    'Is Application Complete?',
    'Application Status'
];

class Review extends Component {
    componentDidMount() {
        // TODO: load on tab change
        this.props.fetchSettings();
        this.props.fetchApplicationToReview();
        this.props.fetchApplicationsWithReviews(REVIEW_TABLE_FETCH_DEFAULT_SETTINGS);
        this.props.fetchApplicationsWithReviewsCount();
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

    handleChangeReviewTablePage(reviewTablePage) {
        this.props.setReviewTablePage({ reviewTablePage });
        this.props.fetchApplicationsWithReviews({
            ...REVIEW_TABLE_FETCH_DEFAULT_SETTINGS,
            skip: reviewTablePage * REVIEW_TABLE_APPLICATIONS_PER_PAGE
        });
        this.props.fetchApplicationsWithReviewsCount();
    }

    updateApplicationStatus(userId, eventId, status) {
        const { reviewTablePage } = this.props;
        this.props.updateApplicationStatus(userId, eventId, status);
        this.handleChangeReviewTablePage(reviewTablePage);
    }

    renderApplicationToReview() {
        const { applicationToReview } = this.props;
        if (isEmpty(applicationToReview)) return (<p>No applications left to review!</p>);
        return (
            <Segment compact>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <HackerApplication application={applicationToReview}/>
                    <ReviewScale onVote={this.handleVote.bind(this)}/>
                </div>
            </Segment>
        );
    }

    renderStatusCell(userId, eventId, currentStatus) {
        if (currentStatus === 'APPLIED') {
            return (
                <div>
                    <Button negative
                            size="mini"
                            onClick={() => this.updateApplicationStatus(userId, eventId, 'REJECTED')}>
                        Reject
                    </Button>
                    <Button size="mini"
                            onClick={() => this.updateApplicationStatus(userId, eventId, 'WAITING_LIST')}>
                        Waitlist
                    </Button>
                    <Button positive
                            size="mini"
                            onClick={() => this.updateApplicationStatus(userId, eventId, 'ACCEPTED')}>
                        Accept
                    </Button>
                </div>
            );
        }

        return currentStatus;
    }

    renderViewReviews() {
        const { applicationsWithReviews, settings } = this.props;

        const { numberOfReviewsRequired } = settings;
        const maxScore = numberOfReviewsRequired * YES_SCORE;

        const applications = applicationsWithReviews.map((user) => {
            const { _id, firstName, lastName, score, applications, events } = user;
            const event = head(events); // TODO: This is a big hack. We should actually determine what the current
                                        // event is
            const hasGoldenTicket = score > maxScore;
            const application = applications.find((application) => application.event === event) || {};
            return {
                _id,
                event,
                firstName,
                lastName,
                score,
                hasGoldenTicket,
                isApplicationComplete: hasGoldenTicket || (user.reviews.length >= numberOfReviewsRequired),
                status: application.status || 'APPLIED'
            };
        });

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
                                {map(application, (value, key) => {
                                    if (key === '_id' || key === 'event') return null;
                                    return (
                                        <Table.Cell key={uuid()}
                                                    positive={(key.match(/(is|has)/) && value) || (key === 'status' && value === 'ACCEPTED')}
                                                    negative={key.match(/(is|has)/) && !value || (key === 'status' && value === 'REJECTED')}>
                                            {
                                                key === 'status'
                                                    ? this.renderStatusCell(application._id, application.event, value)
                                                    : String(value)
                                            }
                                        </Table.Cell>
                                    );
                                })}
                            </Table.Row>
                        ))}
                    </Table.Body>
                    {this.renderViewReviewsFooter()}
                </Table>
            </Segment>
        );
    }

    renderViewReviewsFooter() {
        const { applicationsWithReviewsCount, reviewTablePage } = this.props;
        const numberOfTablePages = Math.ceil(applicationsWithReviewsCount / REVIEW_TABLE_APPLICATIONS_PER_PAGE);
        const pageButtons = [];

        if (reviewTablePage - 1 >= 0) {
            pageButtons.push(
                <Menu.Item as='a'
                           icon
                           key={uuid()}
                           onClick={() => this.handleChangeReviewTablePage(reviewTablePage - 1)}>
                    <Icon name='left chevron'/>
                </Menu.Item>
            );
        }

        if (reviewTablePage - 2 >= 0) {
            pageButtons.push(
                <Menu.Item as='a'
                           key={uuid()}
                           onClick={() => this.handleChangeReviewTablePage(reviewTablePage - 2)}>
                    {reviewTablePage - 2}
                </Menu.Item>
            );
        }

        if (reviewTablePage - 1 >= 0) {
            pageButtons.push(
                <Menu.Item as='a'
                           key={uuid()}
                           onClick={() => this.handleChangeReviewTablePage(reviewTablePage - 1)}>
                    {reviewTablePage - 1}
                </Menu.Item>
            );
        }

        pageButtons.push(
            <Menu.Item as='a'
                       key={uuid()}
                       active>
                {reviewTablePage}
            </Menu.Item>
        );

        if (reviewTablePage + 1 < numberOfTablePages) {
            pageButtons.push(
                <Menu.Item as='a'
                           key={uuid()}
                           onClick={() => this.handleChangeReviewTablePage(reviewTablePage + 1)}>
                    {reviewTablePage + 1}
                </Menu.Item>
            );
        }

        if (reviewTablePage + 2 < numberOfTablePages) {
            pageButtons.push(
                <Menu.Item as='a'
                           key={uuid()}
                           onClick={() => this.handleChangeReviewTablePage(reviewTablePage + 2)}>
                    {reviewTablePage + 2}
                </Menu.Item>
            );
        }

        if (reviewTablePage + 1 < numberOfTablePages) {
            pageButtons.push(
                <Menu.Item as='a'
                           icon
                           key={uuid()}
                           onClick={() => this.handleChangeReviewTablePage(reviewTablePage + 1)}>
                    <Icon name='right chevron'/>
                </Menu.Item>
            );
        }

        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={REVIEW_TABLE_HEADERS.length}>
                        <p>
                            {`${reviewTablePage * REVIEW_TABLE_APPLICATIONS_PER_PAGE + 1} `}
                            to
                            {` ${
                                reviewTablePage * REVIEW_TABLE_APPLICATIONS_PER_PAGE + (REVIEW_TABLE_APPLICATIONS_PER_PAGE) > applicationsWithReviewsCount
                                    ? applicationsWithReviewsCount
                                    : reviewTablePage * REVIEW_TABLE_APPLICATIONS_PER_PAGE + (REVIEW_TABLE_APPLICATIONS_PER_PAGE)
                                } `}
                            of
                            {` ${applicationsWithReviewsCount} `}
                        </p>
                        <Menu floated='right'
                              pagination>
                            {pageButtons}
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
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
        applicationsWithReviewsCount: getApplicationsWithReviewsCount(state),
        reviewTablePage: getReviewTablePage(state),
        settings: getSettings(state),
        user: getUser(state)
    };
}

export default connect(mapStateToProps, {
    fetchApplicationToReview,
    fetchApplicationsWithReviews,
    fetchApplicationsWithReviewsCount,
    fetchSettings,
    setReviewTablePage,
    submitApplicationReview,
    updateApplicationStatus
})(Review);
