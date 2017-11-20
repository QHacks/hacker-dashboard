import { actionCreators, selectors } from '../../HackerStore';
import { Redirect } from 'react-router-dom';
import LoginForm from '../utils/LoginForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import './Login.less';

const { login } = actionCreators;

class Login extends Component {

    handleLogin(values) {
        this.props.login(values);
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
            <div className="login-container">
                <div className="login-form-wrapper">
                    <img src={require('../../assets/img/qhacks-tricolor-logo.svg')}
                         className="qhacks-logo"
                         style={{ marginBottom: '50px' }}
                    />
                    <LoginForm onSubmit={this.handleLogin.bind(this)}/>
                </div>
                <div className="login-picture">
                    <div className="login-picture-overlay">
                        <div>
                            <Header as="h1"
                                    className="fontWeight-normal"
                                    inverted
                                    size="huge"
                            >
                                Dream it. Build it.
                            </Header>
                            <Header as="h2"
                                    className="fontWeight-lighter"
                                    inverted
                                    size="medium"
                            >
                                QHacks 2018, Queen's University
                            </Header>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { login })(Login);
