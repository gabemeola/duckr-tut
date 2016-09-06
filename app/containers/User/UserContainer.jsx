import React, { Component, PropTypes } from 'react';
import { User } from 'components';
import { connect } from 'react-redux';
import { fetchAndHandleUser} from 'redux/modules/users';
import { fetchAndHandleUsersDucks } from 'redux/modules/usersDucks';
import { staleUser, staleDucks } from 'helpers/utils';

class UserContainer extends Component {
	componentDidMount() {
		const { uid } = this.props.routeParams;
		const { dispatch, lastUpdatedUser, lastUpdatedDucks } = this.props;

		if(this.props.noUser === true || staleUser(lastUpdatedUser)) {
			dispatch(fetchAndHandleUser(uid))
		}

		if(this.props.noUser === true || staleDucks(lastUpdatedDucks)) {
			dispatch(fetchAndHandleUsersDucks(uid))
		}
	}
	render() {
		return(
			<User
				noUser={this.props.noUser}
			  name={this.props.name}
			  isFetching={this.props.isFetching}
			  error={this.props.error}
			  duckIds={this.props.duckIds}
			/>
		)
	}
}

UserContainer.propTypes = {
	noUser: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	duckIds: PropTypes.array.isRequired,
	routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
	lastUpdatedUser: PropTypes.number.isRequired,
	lastUpdatedDucks: PropTypes.number.isRequired
};

function mapStateToProps({users, usersDucks}, props) {
	const specificUsersDucks = usersDucks[props.routeParams.uid];
	const user = users[props.routeParams.uid];
	const noUser = typeof user === 'undefined';
	const name = noUser ? '' : user.info.name;
	return {
		noUser,
		name,
		isFetching: users.isFetching || usersDucks.isFetching,
		error: users.error || usersDucks.error,
		duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
		lastUpdatedUser: user ? user.lastUpdated : 0,
		lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.lastUpdated : 0
	}
}

export default connect(
	mapStateToProps
)(UserContainer)