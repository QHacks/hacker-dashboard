import { actionCreators } from '../../HackerStore';
import ApplyForm from '../utils/ApplyForm';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { apply } = actionCreators;

class Apply extends Component {

	constructor(props) {
		super(props);

		this.handleApply = this.handleApply.bind(this);
	}

	handleApply(values) {
		const { apply } = this.props;

		apply(values);
	}

	render() {
		return (
			<div>
				<ApplyForm onSubmit={ this.handleApply } />
				<Link to="/login">Have an account?</Link>
			</div>
		);
	}
}

export default connect(null, { apply })(Apply);
