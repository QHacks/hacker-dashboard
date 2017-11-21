import { Button, Divider, Form, Header, Message } from 'semantic-ui-react';
import SemanticFormField from './SemanticFormField';
import { validationHelpers } from './validation';
import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.less';

const { required } = validationHelpers;

class LoginForm extends Component {

	constructor(props) {
		super(props);

		this.renderLoginForm.bind(this);
	}

	renderLoginFormHeader() {
		return (
			<Header as="h2"
				color="red"
				textAlign="center">
					Login to your account
			</Header>
		);
	}

	renderLoginFormErrorMessage() {
		return (
			<Message
				error
				size='small'
				className="error-message"
				header='Invalid Credentials!'
				content='Oops! We cannot authenticate you with those credentials.'
			/>
		);
	}

	renderLoginFormFooter() {
		return (
			<div>
				<div className="fontSize-medium"
					style={{ marginTop: '40px' }}>
					<Link to="/reset-password">Forgot password?</Link>
					<Divider/>
					<p>
						Haven't applied yet? <Link to="/apply">Apply Here</Link>
					</p>
				</div>
			</div>
		);
	}

	renderLoginForm() {
		return (
			<Form size="large"
				error={this.props.loginError}
				loading={this.props.loginLoading}
				onSubmit={this.props.handleSubmit}>

				<Field name="email"
					component={SemanticFormField}
					as={Form.Input}
					icon="mail"
					type="email"
					placeholder="Email address"
					validate={required} />

				<Field name="password"
					component={SemanticFormField}
					as={Form.Input}
					icon="lock"
					type="password"
					placeholder="Password"
					validate={required} />

				{this.renderLoginFormErrorMessage()}

				<Button primary fluid size="large">
					Login
				</Button>
			</Form>
		);
	}

	render() {
		return (
			<div className="login-form-container">
				{this.renderLoginFormHeader()}
				{this.renderLoginForm()}
				{this.renderLoginFormFooter()}
			</div>
		);
	}
}

export default reduxForm({
	form: 'login',
	enableReinitialize: true
})(LoginForm);
