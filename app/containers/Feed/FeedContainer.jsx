import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Feed } from 'components';
import { setAndHandleFeedListener, resetNewDucksAvailable } from 'redux/modules/feed';

class FeedContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(setAndHandleFeedListener());
	}
	render() {
		return (
			<Feed
				newDuckAvailable={this.props.newDucksAvailable}
			  error={this.props.error}
			  isFetching={this.props.isFetching}
			  resetNewDucksAvailable={resetNewDucksAvailable}
			/>
		)
	}
}

FeedContainer.propTypes = {
	newDucksAvailable: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired
};

function mapStateToProps({feed}) {
	const { newDucksAvailable, error, isFetching } = feed;
	return {
		newDucksAvailable,
		error,
		isFetching
	}
}

export default connect(
	mapStateToProps
)(FeedContainer);