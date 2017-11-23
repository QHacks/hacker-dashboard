import { actionCreators, selectors } from '../../HackerStore';
import { Divider, Header } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import ApplyForm from '../utils/ApplyForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Apply.less';

const { getApplicationLoading, getApplicationError, getApplicationPage,  getAuthenticated } = selectors;
const { apply, applicationPageUpdate } = actionCreators;

class Apply extends Component {

    handleApply(values) {
        const { apply } = this.props;

        apply(values);
    }

    handlePageUpdate(applicationPage) {
        const { applicationPageUpdate } = this.props;

        applicationPageUpdate({ applicationPage });
    }

    getRedirectPath() {
        const locationState = this.props.location.state;

        if (locationState && locationState.from.pathname) {
            return locationState.from.pathname;
        }

        return '/dashboard';
    }

    renderApplicationForm() {
        const { applicationError, applicationLoading, applicationPage } = this.props;
        return (
            <ApplyForm onSubmit={this.handleApply.bind(this)}
                       applicationError={applicationError}
                       applicationLoading={applicationLoading}
                       applicationPage={applicationPage}
                       onPageUpdate={this.handlePageUpdate.bind(this)}/>
        );
    }

    renderApplicationHeader() {
        return (
            <div className="application-header">
                <img
                    src={require('../../assets/img/qhacks-tricolor-logo.svg')}
                    className="qhacks-logo"
                />
                <Header as="h2"
                        content="Complete the form to apply!"
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
                <Divider/>
                <p className="fontSize-medium textAlign-center">
                    Have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        );
    }

    render() {
        const { authenticated } = this.props;

        if (authenticated) {
            return (
                <Redirect to={{
                    pathname: this.getRedirectPath(), state: {
                        from: this.props.location
                    }
                }}/>
            );
        }

        return (
            <div className="application-container">
                <div className="application-graphics"/>
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
        authenticated: getAuthenticated(state)
    };
}

export default connect(mapStateToProps, { apply, applicationPageUpdate })(Apply);
