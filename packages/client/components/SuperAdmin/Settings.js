import {
  Button,
  Dropdown,
  Header,
  Table,
  Divider,
  Segment,
  Container
} from "semantic-ui-react";
import { actionCreators } from "../../HackerStore/HackerActions";
import { isArray, isEmpty, map, pick } from "lodash";
import { selectors } from "../../HackerStore/HackerReducer";
import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";

const {
  fetchAdmins,
  fetchEmails,
  fetchReviewers,
  fetchSettings,
  reassignReviewers,
  sendEmail,
  setTestEmailRecipients
} = actionCreators;
const {
  getAdmins,
  getEmails,
  getReviewers,
  getSettings,
  getTestEmailRecipients
} = selectors;

const NUMBER_OF_REVIEWS_REQUIRED = "numberOfReviewsRequired";
const SETTINGS_FIELDS = [NUMBER_OF_REVIEWS_REQUIRED];

class Settings extends Component {
  componentDidMount() {
    this.props.fetchReviewers();
    this.props.fetchSettings();
    this.props.fetchEmails();
    this.props.fetchAdmins();
  }

  handleReassignClick() {
    this.props.reassignReviewers();
  }

  handleTestEmailRecipientDropdownChange(e, data, { templateName }) {
    const testEmailRecipients = data.value;
    this.props.setTestEmailRecipients({
      testEmailRecipients: { [templateName]: testEmailRecipients }
    });
  }

  handleSendTestEmailClick(templateName) {
    const { admins } = this.props;
    const recipients = this.props.testEmailRecipients[templateName].map(
      (recipientId) => admins.find((admin) => admin._id === recipientId)
    );
    this.props.sendEmail(templateName, recipients);
  }

  renderSettings() {
    const settings = pick(this.props.settings, SETTINGS_FIELDS);
    return map(settings, (value, key) => (
      <div key={key}>
        <div>
          <b>{key}</b>
        </div>
        <div>{value}</div>
      </div>
    ));
  }

  renderReviewerGroups() {
    if (isEmpty(this.props.reviewers)) return <div>No reviewers found.</div>;

    const numberOfColumns = this.props.settings[NUMBER_OF_REVIEWS_REQUIRED];

    if (numberOfColumns <= 0) {
      return <div>No Reviewers Assigned!</div>;
    }

    const reviewersByColumn = this.props.reviewers.reduce((accum, reviewer) => {
      const { reviewGroup: groupNumber } = reviewer;
      const group = accum[groupNumber];
      accum[groupNumber] = (isArray(group) && [...group, reviewer]) || [
        reviewer
      ];
      return accum;
    }, []);

    const reviewersByRow = [];
    const numberOfRows = reviewersByColumn.reduce(
      (max, reviewersInColumn) =>
        reviewersInColumn.length > max ?
          reviewersInColumn.length :
          max,
      0
    );

    for (let i = 0; i < numberOfRows; i++) {
      reviewersByRow.push(
        reviewersByColumn.map((reviewersInColumn) => reviewersInColumn[i] || {})
      );
    }

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {reviewersByColumn.map((reviwersInColumn, index) => (
              <Table.HeaderCell key={uuid()}>{`Group ${index +
                1}`}</Table.HeaderCell>
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

  renderEmailSettings() {
    const { emails } = this.props;

    if (isEmpty(emails)) return null;

    const NAME = "name";

    return (
      <div>
        <Header as="h2">Emails</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Template Name</Table.HeaderCell>
              <Table.HeaderCell>Test Email Recipients</Table.HeaderCell>
              <Table.HeaderCell>Send Test Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {emails.map((email) => (
              <Table.Row key={uuid()}>
                <Table.Cell>{email[NAME]}</Table.Cell>
                <Table.Cell>
                  {this.renderDropdownOfAdmins(email[NAME])}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    positive
                    onClick={() => this.handleSendTestEmailClick(email[NAME])}
                  >
                    Send Test Email
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  renderDropdownOfAdmins(templateName) {
    const { admins, testEmailRecipients } = this.props;
    return (
      <Dropdown
        placeholder="Select a test email recipient"
        fluid
        multiple
        selection
        onChange={(e, data) =>
          this.handleTestEmailRecipientDropdownChange(e, data, { templateName })
        }
        value={testEmailRecipients[templateName]}
        options={admins.map((admin) => ({
          key: admin._id,
          text: `${admin.firstName} ${admin.lastName}`,
          value: admin._id
        }))}
      />
    );
  }

  render() {
    return (
      <Container text style={{ marginTop: "3em" }}>
        <Header as="h1">Settings</Header>
        <Segment>{this.renderSettings()}</Segment>
        <Header as="h1">Admin Actions</Header>
        <Segment>
          <Header as="h2">Review Groups</Header>
          {this.renderReviewerGroups()}
          <Button primary onClick={this.handleReassignClick.bind(this)}>
            Re-Assign Admins
          </Button>
          <Divider section />
          {this.renderEmailSettings()}
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    admins: getAdmins(state),
    emails: getEmails(state),
    reviewers: getReviewers(state),
    settings: getSettings(state),
    testEmailRecipients: getTestEmailRecipients(state)
  };
}

export default connect(mapStateToProps, {
  fetchAdmins,
  fetchEmails,
  fetchReviewers,
  fetchSettings,
  reassignReviewers,
  sendEmail,
  setTestEmailRecipients
})(Settings);
