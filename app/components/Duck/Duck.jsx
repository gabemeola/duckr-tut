import React, { PropTypes } from "react";
import { formatTimestamp } from 'helpers/utils';
import Reply from 'react-icons/lib/fa/mail-reply';
import Star from 'react-icons/lib/fa/star';

function Duck(props) {
	console.log(props);
	return (
		<div>Duck</div>
	)
}

Duck.propTypes = {
	duck: PropTypes.shape({
		avatar: PropTypes.string.isRequired,
		duckId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		timestamp: PropTypes.number.isRequired,
		uid: PropTypes.string.isRequired
	}),
	onClick: PropTypes.func,
	isLiked: PropTypes.bool.isRequired,
	addAndHandleLike: PropTypes.func.isRequired,
	handleDeleteLike: PropTypes.func.isRequired,
	numberOfLikes: PropTypes.number,
	hideReplyBtn: PropTypes.bool.isRequired,
	hideLikeCount: PropTypes.bool.isRequired,
	goToProfile: PropTypes.func.isRequired
};

export default Duck;