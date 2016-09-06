import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { DuckDetails } from 'components';
import { fetchAndHandleDuck, removeFetching } from 'redux/modules/ducks';
import { initLikeFetch } from 'redux/modules/likeCount';

class DuckDetailsContainer extends Component {
	componentDidMount() {
		const { dispatch, duckId } = this.props;

		dispatch(initLikeFetch(duckId));
		if (this.props.duckAlreadyFetched === false) {
			// fetch duck and save to store
			dispatch(fetchAndHandleDuck(duckId))
		} else {
			// Set is Fetching to False if we already have the duck in our store
			dispatch(removeFetching())
		}
	}
	render() {
		return(
			<DuckDetails
				addAndHandleReply={(duckId, reply) => console.log(duckId, reply)}
				authedUser={this.props.authedUser}
			  duckId={this.props.duckId}
			  error={this.props.error}
			  isFetching={this.props.isFetching}
			/>
		)
	}
}

DuckDetailsContainer.propTypes = {
	authedUser: PropTypes.object.isRequired,
	duckId: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	duckAlreadyFetched: PropTypes.bool.isRequired
};

function mapStateToProps({ducks, likeCount, users}, props) {
	return {
		isFetching: ducks.isFetching || likeCount.isFetching,
		error: ducks.error,
		authedUser: users[users.authedId].info,
		duckId: props.routeParams.duckId,
		duckAlreadyFetched: !!ducks[props.routeParams.duckId]
	}
}

export default connect(
	mapStateToProps
)(DuckDetailsContainer)