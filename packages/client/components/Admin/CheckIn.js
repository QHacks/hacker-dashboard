import React, { Component } from "react";
import {
  Button,
  Container,
  Dropdown,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { actionCreators } from "../../HackerStore/HackerActions";
import { selectors } from "../../HackerStore/HackerReducer";
import uuid from "uuid/v4";

const {
  fetchHackersRequiringCheckIn,
  setHackerIDToCheckIn,
  updateHackerCheckInStatus
} = actionCreators;
const {
  getIsHackerBeingCheckedIn,
  getAreHackersRequiringCheckInLoading,
  getHackersRequiringCheckIn,
  getHackerIDToCheckIn
} = selectors;

class CheckIn extends Component {
  componentWillMount() {
    // fetch initial users list
    this.fetchHackersRequiringCheckIn();
  }

  fetchHackersRequiringCheckIn(email) {
    this.props.fetchHackersRequiringCheckIn({ email });
  }

  setSelectedHacker(e, { value: hackerId }) {
    this.props.setHackerIDToCheckIn({ hacker: hackerId });
  }

  checkInHacker(hackerId) {
    const eventId = this.props.hackers.filter((h) => (h._id = hackerId))[0]
      .applications[0].event; //TODO: Fix this hack shit
    this.props.setHackerIDToCheckIn({ hacker: "" });
    this.fetchHackersRequiringCheckIn();
    this.props.updateHackerCheckInStatus(hackerId, eventId, "COMPLETED");
  }

  renderBody() {
    const {
      hackers,
      areHackersRequiringCheckInLoading,
      isHackerBeingCheckedIn,
      selectedHackerId
    } = this.props;
    const isEmailDropdownLoading =
      areHackersRequiringCheckInLoading || isHackerBeingCheckedIn;

    if (!hackers || hackers.length === 0) {
      return (
        <Segment>
          <Message>No hackers to check in!</Message>
        </Segment>
      );
    }

    return (
      <Segment>
        <Header as="h2">Which hacker do you want to check in?</Header>
        <Dropdown
          fluid
          selection
          search
          options={hackers.map((hacker) => ({
            key: uuid(),
            text: `${hacker.email} (${hacker.firstName} ${hacker.lastName})`,
            value: hacker._id
          }))}
          placeholder="Select a hacker to check in"
          value={selectedHackerId}
          onChange={this.setSelectedHacker.bind(this)}
          disabled={isEmailDropdownLoading}
          loading={isEmailDropdownLoading}
        />
        <Button positive onClick={() => this.checkInHacker(selectedHackerId)}>
          Check Selected Hacker In
        </Button>
      </Segment>
    );
  }

  render() {
    return (
      <Container text style={{ marginTop: "3em" }}>
        <Header as="h1">Check In</Header>
        {this.renderBody()}
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    hackers: getHackersRequiringCheckIn(state),
    areHackersRequiringCheckInLoading: getAreHackersRequiringCheckInLoading(
      state
    ),
    isHackerBeingCheckedIn: getIsHackerBeingCheckedIn(state),
    selectedHackerId: getHackerIDToCheckIn(state)
  };
}

export default connect(
  mapStateToProps,
  {
    fetchHackersRequiringCheckIn,
    setHackerIDToCheckIn,
    updateHackerCheckInStatus
  }
)(CheckIn);
