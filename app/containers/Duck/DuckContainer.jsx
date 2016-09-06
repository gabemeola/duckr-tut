import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Duck } from 'components';
import * as usersLikesActions from 'redux/modules/usersLikes';

class DuckContainer extends Component {
	goToProfile(event) {
		event.stopPropagation();
		this.context.router.push('/' + this.props.duck.uid)
	}
	handleClick(event) {
		event.stopPropagation();
		this.context.router.push('/duckDetail/' + this.props.duck.duckId)
	}
	render() {
		return (
			<Duck
				goToProfile={(e) => this.goToProfile(e)}
			  onClick={this.props.hideReplyBtn === true ? null : (e) => this.handleClick(e)} // Allow user to click on duck in feed but not in duck detail component view
				{...this.props} // Pass all Container props to Duck Component
			/>
		)
	}
}

DuckContainer.contextTypes = {
	router: PropTypes.object.isRequired
};

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

function mapStateToProps({ducks, likeCount, usersLikes}, props) { // Second Argument Received is component's own props
	return {
		duck: ducks[props.duckId],
		hideLikeCount: props.hideLikeCount,
		hideReplyBtn: props.hideReplyBtn,
		isLiked: usersLikes[props.duckId] === true,
		numberOfLikes: likeCount[props.duckId]
	}
}

export default connect(
	mapStateToProps,
	(dispatch) => bindActionCreators(usersLikesActions, dispatch)
)(DuckContainer);