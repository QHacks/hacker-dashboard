import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { SCORES } from '../Admin/ReviewScale';
import { head, map } from 'lodash';
import { Button, Icon, Menu, Segment, Table } from 'semantic-ui-react';
import { selectors } from '../../HackerStore/HackerReducer';
import { actionCreators } from '../../HackerStore/HackerActions';

const {
	fetchApplicationsWithReviews,
	fetchApplicationsWithReviewsCount,
	fetchSettings,
	setReviewTablePage,
	updateApplicationStatus
} = actionCreators;
const {
	getApplicationsWithReviews,
	getApplicationsWithReviewsCount,
	getReviewTablePage,
	getSettings
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
	'Application Status',
	'RSVP'
];

class Applicants extends Component {

	componentDidMount() {
		const { reviewTablePage } = this.props;
		this.props.fetchSettings();
		this.props.fetchApplicationsWithReviews({
			...REVIEW_TABLE_FETCH_DEFAULT_SETTINGS,
			skip: reviewTablePage * REVIEW_TABLE_APPLICATIONS_PER_PAGE
		});
		this.props.fetchApplicationsWithReviewsCount();
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
						{reviewTablePage - 1}
				</Menu.Item>
			);
		}

		if (reviewTablePage - 1 >= 0) {
			pageButtons.push(
				<Menu.Item as='a'
									key={uuid()}
									onClick={() => this.handleChangeReviewTablePage(reviewTablePage - 1)}>
					{reviewTablePage}
				</Menu.Item>
			);
		}

		pageButtons.push(
			<Menu.Item as='a'
								key={uuid()}
								active>
				{reviewTablePage + 1}
			</Menu.Item>
		);

		if (reviewTablePage + 1 < numberOfTablePages) {
			pageButtons.push(
				<Menu.Item as='a'
									key={uuid()}
									onClick={() => this.handleChangeReviewTablePage(reviewTablePage + 1)}>
					{reviewTablePage + 2}
				</Menu.Item>
			);
		}

		if (reviewTablePage + 2 < numberOfTablePages) {
			pageButtons.push(
				<Menu.Item as='a'
									key={uuid()}
									onClick={() => this.handleChangeReviewTablePage(reviewTablePage + 2)}>
					{reviewTablePage + 3}
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
							status: application.status || 'APPLIED',
							rsvp: application.rsvp
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
																									positive={(key.match(/(is|has)/) && value) || (key === 'status' && value === 'ACCEPTED') || (key === 'rsvp' && value === 'COMPLETED')}
																									negative={key.match(/(is|has)/) && !value || (key === 'status' && value === 'REJECTED') || (key === 'rsvp' && value === 'NOT_NEEDED')}>
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
}

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		applicationsWithReviews: getApplicationsWithReviews(state),
		applicationsWithReviewsCount: getApplicationsWithReviewsCount(state),
		reviewTablePage: getReviewTablePage(state),
		settings: getSettings(state)
	};
}

export default connect(mapStateToProps, {
	fetchApplicationsWithReviews,
	fetchApplicationsWithReviewsCount,
	fetchSettings,
	setReviewTablePage,
	updateApplicationStatus
})(Applicants);
