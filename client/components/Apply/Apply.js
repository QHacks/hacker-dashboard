import { actionCreators, selectors } from '../../HackerStore';
import { Link, Redirect } from 'react-router-dom';
import ApplyForm from '../utils/ApplyForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import './Apply.less';

const { apply } = actionCreators;

class Apply extends Component {

    handleApply(values) {
        const { apply } = this.props;

        apply(values);
    }

    getRedirectPath() {
        const locationState = this.props.location.state;
        if (locationState && locationState.from.pathname) {
            return locationState.from.pathname;
        }
        return '/dashboard';
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
                <div className="application-graphics">
                    <img className="graphic bottom left" src={require('../../assets/img/apply/bottom-left.svg')}/>
                </div>
                <div className="application-form-container">
                    <img src={require('../../assets/img/qhacks-tricolor-logo.svg')}
                         className="qhacks-logo"/>
                    <Header as="h2"
                            content="Complete the form to apply!"
                            color="red"
                            textAlign="center"/>
                    <ApplyForm onSubmit={this.handleApply.bind(this)}/>
                    <Link to="/login">Have an account?</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        authenticated: selectors.getAuthenticated(state)
    };
}

export default connect(mapStateToProps, { apply })(Apply);
