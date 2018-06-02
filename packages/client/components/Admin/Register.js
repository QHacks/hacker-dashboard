import { actionCreators, selectors } from '../../HackerStore';
//import ApplicationsClosed from './ApplicationsClosed';
import { Divider, Header } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MISC } from '../../strings';
import { AdminForm } from '../Forms';
//import './Register.less';

const {
  getApplicationLoading,
  getApplicationError,
  getApplicationPage,
  getAuthenticated,
  getApplicationsStatus
} = selectors;
const { adminRegister, applicationPageUpdate } = actionCreators;

const { APPLICATION_CLOSED_STATUS } = false;

class Register extends Component {
  handleAdminRegister(values) {
    this.props.adminRegister(values);
  }

  handlePageUpdate(applicationPage) {
    this.props.applicationPageUpdate({ applicationPage });
  }

  renderApplicationForm() {
    const {
      applicationError,
      applicationLoading,
      applicationPage,
      applicationsStatus
    } = this.props;

    if (applicationsStatus === APPLICATION_CLOSED_STATUS) {
      return <ApplicationsClosed />;
    }

    return (
      <AdminForm
        onSubmit={this.handleAdminRegister.bind(this)}
        applicationError={applicationError}
        applicationLoading={applicationLoading}
        applicationPage={applicationPage}
        onPageUpdate={this.handlePageUpdate.bind(this)}
      />
    );
  }
  renderApplicationHeader() {
    const { applicationsStatus } = this.props;
    return (
      <div className="application-header">
        <img
          src={require('../../assets/img/qhacks-tricolor-logo.svg')}
          className="qhacks-logo"
        />
        <Header
          as="h2"
          content="Register as a QHacks admin"
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
    const { authenticated, applicationsStatus } = this.props;


    return (
      <div className="application-container">
        <div className="application-graphics" />
        <div className="application-form-container">
          {this.renderApplicationHeader()}
          {this.renderApplicationForm()}
          {this.renderApplicationFooter()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    applicationError: getApplicationError(state),
    applicationLoading: getApplicationLoading(state),
    applicationPage: getApplicationPage(state),
    authenticated: getAuthenticated(state),
    applicationsStatus: getApplicationsStatus(state)
  };
}

export default connect(mapStateToProps, { adminRegister, applicationPageUpdate })(
  Register
);
