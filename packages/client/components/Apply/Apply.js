import ApplicationsClosed from "./ApplicationsClosed";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";

class Apply extends Component {
  handleApply(values) {
    // make api request to apply
  }

  handlePageUpdate(applicationPage) {
    // specific to how we had pages in our application form last year
  }

  getRedirectPath() {
    const locationState = this.props.location.state;

    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    }

    return "/";
  }

  renderApplicationForm() {
    const applicationsStatus = "closed";

    if (applicationsStatus === "closed") {
      return <ApplicationsClosed />;
    }

    return null;
  }
  renderApplicationHeader() {
    const applicationsStatus = "closed";

    const headerContent =
      applicationsStatus === "closed"
        ? "Applications are now closed!"
        : "Complete the form to apply!";

    return (
      <div
        css={`
          alignttems: center;
          display: flex;
          flexdirection: column;
          margintop: 40px;
        `}
      >
        <img
          css={`
            height: 120px;
          `}
          src={require("../../assets/img/qhacks-tricolor-logo.svg")}
        />
        <h2>{headerContent}</h2>
      </div>
    );
  }

  renderApplicationFooter() {
    return (
      <div
        css={`
          margin-top: 20px;
          margin-bottom: 40px;
        `}
      >
        <p>
          Have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
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
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
            padding: 30px 20px;
            max-width: 600px;
            width: 100%;
          `}
        >
          {this.renderApplicationHeader()}
          {this.renderApplicationForm()}
          {this.renderApplicationFooter()}
        </div>
      </div>
    );
  }
}

export default Apply;
