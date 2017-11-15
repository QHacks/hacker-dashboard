import React from 'react';
import { Button, Divider, Form, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import './LoginForm.less';

function LoginForm(props) {
    return (
        <div className="login-form-container">
            <Header as="h2"
                    color="red"
                    textAlign="center"
            >
                Login to your account
            </Header>
            <Form size="large"
                  onSubmit={props.handleSubmit}>
                <Form.Field>
                    <div className="ui fluid icon input">
                        <Field name="email"
                               component="input"
                               type="email"
                               placeholder="Email address"
                        />
                        <i aria-hidden="true"
                           className="mail icon"
                        />
                    </div>
                </Form.Field>
                <Form.Field>
                    <div className="ui fluid icon input">
                        <Field name="password"
                               component="input"
                               type="password"
                               placeholder='Password'
                        />
                        <i aria-hidden="true"
                           className="lock icon"
                        />
                    </div>
                </Form.Field>
                <Button primary
                        fluid
                        size="large"
                >
                    Login
                </Button>
            </Form>
            <div className="fontSize-medium"
                 style={{ marginTop: '40px' }}
            >
                <Link to="/reset-password">Forgot password?</Link>
            </div>
            <Divider/>
            <p className="fontSize-large">
                Haven't applied yet? <Link to="/apply">Apply Here</Link>
            </p>
        </div>
    );
}

export default reduxForm({ form: 'login' })(LoginForm);
