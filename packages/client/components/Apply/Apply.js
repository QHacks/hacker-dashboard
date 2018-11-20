import ApplicationsClosed from "./ApplicationsClosed";
import { Divider, Header } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import "./Apply.less";

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
      <div className="application-header">
        <img
          src={require("../../assets/img/qhacks-tricolor-logo.svg")}
          className="qhacks-logo"
        />
        <Header
          as="h2"
          content={headerContent}
          color="red"
          textAlign="center"
          className="form apply header"
        />
      </div>
    );
  }

  renderApplicationFooter() {
    return (
      <div className="application-footer">
        <Divider />
        <p className="fontSize-medium textAlign-center">
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
      <div className="application-container">
        <div className="application-form-container">
          {this.renderApplicationHeader()}
          {this.renderApplicationForm()}
          {this.renderApplicationFooter()}
        </div>
      </div>
    );
  }
}

export default Apply;
