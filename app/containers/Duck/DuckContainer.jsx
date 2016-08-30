import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Duck } from 'components';

class DuckContainer extends Component {
	render() {
		return (
			<Duck/>
		)
	}
}

DuckContainer.defaultProps = {
	hideReplyBtn: false,
	hideLikeCount: true
};

DuckContainer.propTypes = {
	duck: PropTypes.object.isRequired,
	numberOfLikes: PropTypes.number,
	isLiked: PropTypes.bool.isRequired,
	hideLikeCount: PropTypes.bool.isRequired,
	hideReplyBtn: PropTypes.bool.isRequired,
	handleDeleteLike: PropTypes.func.isRequired,
	addAndHandleLike: PropTypes.func.isRequired
};

function mapStateToProps({ducks, likeCount, usersLikes}, props) { // Second Argument Received is component's props
	return {
		duck: ducks[props.duckId],
		hideLikeCount: props.hideLikeCount,
		hideReplyBtn: props.hideReplyBtn,
		isLiked: usersLikes[props.duckId] === true,
		numberOfLikes: likeCount[props.duckId]
	}
}

export default connect(
	mapStateToProps
)(DuckContainer);