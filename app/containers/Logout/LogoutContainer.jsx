import React, { Component } from "react";
import { connect } from 'react-redux';
import { Logout } from 'components';
import { logoutAndUnauth } from 'redux/modules/users'

class LogoutContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(logoutAndUnauth())
	}
	render() {
		return (
			<Logout/>
		)
	}
}

export default connect()(LogoutContainer);