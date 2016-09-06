import React, { PropTypes } from "react";
import { formatTimestamp } from 'helpers/utils';
import Reply from 'react-icons/lib/fa/mail-reply';
import Star from 'react-icons/lib/fa/star';
import {
	duckContainer, contentContainer, avatar, actionContainer,
	header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'

function Duck(props) {
	const starIcon = props.isLiked === true ? likedIcon : icon;
	const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike; // Either Delete Like or Add Like depending on previous state
	return (
		<div
			className={duckContainer}
		  style={{cursor: props.hideReplyBtn === true ? 'default' : 'pointer'}} // Change cursor to pointer if duck is not expanded
			onClick={props.onClick}
		>
			<img src={props.duck.avatar} className={avatar}/>
			<div className={contentContainer}>
				<div className={header}>
					<div onClick={props.goToProfile} className={author}>{props.duck.name}</div>
					<div>{formatTimestamp(props.duck.timestamp)}</div>
				</div>
				<div className={text}>{props.duck.text}</div>
				<div className={likeReplyContainer}>
					{props.hideReplyBtn === true
						? null
						: <Reply className={icon} style={{marginRight: '15px'}} />
					}
					<div className={actionContainer}>
						<Star className={starIcon} onClick={(e) => starFn(props.duck.duckId, e)}/>
						&nbsp;
						{props.hideLikeCount === true ? null : <div>{props.numberOfLikes}</div>} {/*Show Number of Likes if duck is expanded*/}
					</div>
				</div>
			</div>
		</div>
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