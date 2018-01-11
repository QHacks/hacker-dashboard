import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isArray, isEmpty, map, pick } from 'lodash';
import uuid from 'uuid/v4';
import { Button, Header, Table } from 'semantic-ui-react';
import { actionCreators } from '../../HackerStore/HackerActions';
import { selectors } from '../../HackerStore/HackerReducer';


const { fetchReviewers, fetchSettings, reassignReviewers } = actionCreators;
const { getReviewers, getSettings } = selectors;

const NUMBER_OF_REVIEWS_REQUIRED = 'numberOfReviewsRequired';
const SETTINGS_FIELDS = [
    NUMBER_OF_REVIEWS_REQUIRED
];

class Settings extends Component {
    componentDidMount() {
        this.props.fetchReviewers();
        this.props.fetchSettings();
    }

    handleReassignClick() {
        this.props.reassignReviewers();
    }

    renderSettings() {
        const settings = pick(this.props.settings, SETTINGS_FIELDS);
        return (
            map(settings, (value, key) => (
                <div key={key}>
                    <div><b>{key}</b></div>
                    <div>{value}</div>
                </div>
            ))
        );
    }

    renderReviewerGroups() {
        if (isEmpty(this.props.reviewers)) return <div>No reviewers found.</div>;

        const numberOfColumns = this.props.settings[NUMBER_OF_REVIEWS_REQUIRED];

        if (numberOfColumns <= 0) {
            return (<div>No Reviewers Assigned!</div>);
        }

        const reviewersByColumn = this.props.reviewers.reduce((accum, reviewer) => {
            const { reviewGroup: groupNumber } = reviewer;
            const group = accum[groupNumber];
            accum[groupNumber] = (isArray(group) && [...group, reviewer]) || [reviewer];
            return accum;
        }, []);

        const reviewersByRow = [];
        const numberOfRows = reviewersByColumn.reduce((max, reviewersInColumn) => (
            reviewersInColumn.length > max
                ? reviewersInColumn.length
                : max
        ), 0);

        for (let i = 0; i < numberOfRows; i++) {
            reviewersByRow.push(reviewersByColumn.map((reviewersInColumn) => (
                reviewersInColumn[i] || {}
            )));
        }

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {reviewersByColumn.map((reviwersInColumn, index) => (
                            <Table.HeaderCell key={uuid()}>{`Group ${index + 1}`}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {reviewersByRow.map((reviewersInRow, row) => (
                        <Table.Row key={uuid()}>
                            {reviewersInRow.map((reviewer) => (
                                <Table.Cell key={uuid()}>
                                    {reviewer.firstName} {reviewer.lastName}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <Header as="h2">Modify Settings</Header>
                    {this.renderSettings()}
                </div>
                <div>
                    <Header as="h2">Reviewer groups</Header>
                    {this.renderReviewerGroups()}
                    <Button primary
                            onClick={this.handleReassignClick.bind(this)}>
                        Re-assign admins to reviewing groups
                    </Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        reviewers: getReviewers(state),
        settings: getSettings(state)
    };
}

export default connect(mapStateToProps, { fetchReviewers, fetchSettings, reassignReviewers })(Settings);
