import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import MenuBar from "../MenuBar/index";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationNavigation from "../ApplicationSteps/index";
import ApplicationForm from "./ApplicationForm";

class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNum: 0
    };
  }

  handleApply(values) {
    // make api request to apply
  }

  previousStep() {
    this.setState({ stepNum: this.state.stepNum - 1 });
  }

  nextStep() {
    this.setState({ stepNum: this.state.stepNum + 1 });
  }

  getRedirectPath() {
    const locationState = this.props.location.state;

    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    }

    return "/";
  }

  render() {
    const authenticated = false;
    if (authenticated) {
      return (
        <Redirect
          to={{
            pathname: this.getRedirectPath(),
            state: {
              from: this.props.location
            }
          }}
        />
      );
    }

    return (
      <div>
        <MenuBar />
        <ApplicationHeader />
        <ApplicationNavigation stepNum={this.state.stepNum} />
        <ApplicationForm
          previousStep={() => this.previousStep()}
          nextStep={() => this.nextStep()}
          stepNum={this.state.stepNum}
        />
      </div>
    );
  }
}

export default Apply;
