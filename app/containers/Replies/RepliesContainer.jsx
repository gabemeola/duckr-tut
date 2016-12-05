import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Replies } from 'components';
import { fetchAndHandleReplies } from 'redux/modules/replies';

class RepliesContainer extends Component {
	componentDidMount() {
		this.props.dispatch(fetchAndHandleReplies(this.props.duckId));
	}
	render() {
		return (
			<Replies
				isFetching={this.props.isFetching}
			  error={this.props.error}
			  lastUpdated={this.props.lastUpdated}
			  replies={this.props.replies}
			/>
		)
	}
}

RepliesContainer.defaultProps = {
	lastUpdated: 0,
	replies: {}
};

RepliesContainer.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	lastUpdated: PropTypes.number.isRequired,
	replies: PropTypes.object.isRequired,
	duckId: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
	const duckRepliesInfo = state.replies[props.duckId] || {}; // If No Replies, set to an empty object
	const { lastUpdated, replies } = duckRepliesInfo;
	return {
		isFetching: state.replies.isFetching,
		error: state.replies.error,
		lastUpdated,
		replies
	}
}

export default connect(
	mapStateToProps
)(RepliesContainer);