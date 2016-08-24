import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Navigation } from "components"
import { container, innerContainer } from "./styles.css"
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'redux/modules/users';
import { formatUserInfo } from 'helpers/utils';
import { firebaseAuth } from 'config/constants';

class MainContainer extends Component {
	componentDidMount() {
		firebaseAuth().onAuthStateChanged((user) => {
			if (user) {
				const userData = user.providerData[0];
				const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid);

				this.props.authUser(user.uid);
				this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
				if (this.props.location.pathname === '/') {
					this.context.router.replace('feed');
				}
			} else {
				this.props.removeFetchingUser(); // If user loads app and isn't authenticated yet
			}
		})
	}
	render() {
		return this.props.isFetching === true
			? null
			: <div className={container}>
					<Navigation isAuthed={this.props.isAuthed}/>
					<div className={innerContainer}>
						{this.props.children}
					</div>
				</div>
	}
}

MainContainer.propTypes = {
	isAuthed: PropTypes.bool.isRequired,
	authUser: PropTypes.func.isRequired,
	fetchingUserSuccess: PropTypes.func.isRequired,
	removeFetchingUser: PropTypes.func.isRequired
};

MainContainer.contextTypes = {
	router: PropTypes.object.isRequired
};

export default connect(
	(state) => ({ isAuthed: state.isAuthed, isFetching: state.isFetching }),
	(dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer);