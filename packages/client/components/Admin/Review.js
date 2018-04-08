import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import HackerApplication from './HackerApplication';
import ReviewScale from './ReviewScale';
import { actionCreators } from '../../HackerStore/HackerActions';
import { selectors } from '../../HackerStore/HackerReducer';

const { fetchApplicationToReview, submitApplicationReview } = actionCreators;
const { getApplicationToReview, getUser } = selectors;

class Review extends Component {
		componentDidMount() {
				// TODO: load on tab change
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
				if (isEmpty(applicationToReview)) return (<p>No applications left to review!</p>);
				return (
						<Container style={{ display: 'flex', justifyContent: 'center' }}>
								<Segment compact>
										<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
												<HackerApplication application={applicationToReview}/>
												<ReviewScale onVote={this.handleVote.bind(this)}/>
										</div>
								</Segment>
						</Container>
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
