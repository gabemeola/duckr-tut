import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Authenticate } from 'components';
import auth from 'helpers/auth'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
	handleAuth() {
		const { dispatch } = this.props;

		dispatch(userActionCreators.fetchingUser());
		auth().then((user) => {
			dispatch(userActionCreators.fetchingUserSuccess(user.uid, user, Date.now()));
			dispatch(userActionCreators.authUser(user.uid));
			console.log('Authed User', user)
		}).catch((error) => dispatch(userActionCreators.fetchingUserFailure(error)) )
	}
	render() {
		console.log("Is Fetching: ", this.props.isFetching);
		return (
			<Authenticate
				isFetching={this.props.isFetching}
				error={this.props.error}
				onAuth={() => this.handleAuth()}
			/>
		)
	}
}

AuthenticateContainer.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	console.log("STATE", state);
	return {
		isFetching: state.isFetching,
		error: state.error
	}
}

export default connect(mapStateToProps)(AuthenticateContainer);