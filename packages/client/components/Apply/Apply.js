import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import MenuBar from "../MenuBar/index";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationNavigation from "./ApplicationNavigation";
import ApplicationForm from "./ApplicationForm";

class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0
    };
  }

  handleApply(values) {
    // make api request to apply
  }

  previousPage() {
    this.setState({ pageNum: this.state.pageNum - 1 });
  }

  nextPage() {
    this.setState({ pageNum: this.state.pageNum + 1 });
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
        <ApplicationNavigation pageNum={this.state.pageNum} />
        <ApplicationForm
          previousPage={() => this.previousPage()}
          nextPage={() => this.nextPage()}
          pageNum={this.state.pageNum}
        />
      </div>
    );
  }
}

export default Apply;
