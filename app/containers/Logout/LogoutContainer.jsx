import React, { Component } from "react";
import { connect } from 'react-redux';
import { Logout } from 'components';
import { logoutAndUnauth } from 'redux/modules/users'

class LogoutContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(logoutAndUnauth()); // Not passing as props, but does need dispatch function to be invoked
	}
	render() {
		return (
			<Logout/>
		)
	}
}

export default connect()(LogoutContainer);