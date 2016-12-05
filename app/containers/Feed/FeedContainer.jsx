import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Feed } from 'components';
import * as feedActionCreators from 'redux/modules/feed';
import { List } from 'immutable';

class FeedContainer extends Component {
	componentDidMount() {
		this.props.setAndHandleFeedListener();
	}
	render() {
		return (
			<Feed
				duckIds={this.props.duckIds}
				newDucksAvailable={this.props.newDucksAvailable}
			  error={this.props.error}
			  isFetching={this.props.isFetching}
				resetNewDucksAvailable={this.props.resetNewDucksAvailable}
			/>
		)
	}
}

FeedContainer.propTypes = {
	duckIds: PropTypes.instanceOf(List),
	newDucksAvailable: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	setAndHandleFeedListener: PropTypes.func.isRequired,
	resetNewDucksAvailable: PropTypes.func.isRequired
};

function mapStateToProps({feed}) {
	return {
		newDucksAvailable: feed.get('newDucksAvailable'),
		error: feed.get('error'),
		isFetching: feed.get('isFetching'),
		duckIds: feed.get('duckIds')
	}
}

export default connect(
	mapStateToProps,
	(dispatch) => bindActionCreators(feedActionCreators, dispatch)
)(FeedContainer);