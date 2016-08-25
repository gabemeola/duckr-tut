import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Authenticate } from 'components';
import * as userActionCreators from 'redux/modules/users';

class AuthenticateContainer extends Component {
	handleAuth(e) {
		e.preventDefault();
		// fetchAndHandleAuthedUser is pass as a prop
		this.props.fetchAndHandleAuthedUser()  // After Authentication, send to Feed Route
			.then(() => this.context.router.replace('feed'))
	}
	render() {
		console.log("Is Fetching: ", this.props.isFetching);
		return (
			<Authenticate
				isFetching={this.props.isFetching}
				error={this.props.error}
				onAuth={(e) => this.handleAuth(e)}
			/>
		)
	}
}

AuthenticateContainer.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	fetchAndHandleAuthedUser: PropTypes.func.isRequired
};

AuthenticateContainer.contextTypes = {
	router: PropTypes.object.isRequired
};

const mapStateToProps = ({users}) => { // Maps Relevant Redux State to component props
	console.log("USERS STATE", users);
	return {
		isFetching: users.isFetching,
		error: users.error
	}
};

export default connect(
	mapStateToProps,
	(dispatch) => bindActionCreators(userActionCreators, dispatch) // Bind Action creators to dispatch and pass as props
)(AuthenticateContainer);