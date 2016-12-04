import React, { PropTypes } from 'react';
import {
	mainContainer, container, content, repliesContainer,
	replyTextAreaContainer, replyTextArea } from './styles.css';
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css';
import { DuckContainer, RepliesContainer } from 'containers';
import { formatReply } from 'helpers/utils';

function Reply({submit}) { // Private stateless Component
	function handleSubmit(e) {
		if(Reply.ref.value.length === 0) return; // If length is Zero do nothing

		submit(Reply.ref.value, e);
		Reply.ref.value = ''; // Resets text to an empty string
	}

	return(
		<div className={replyTextAreaContainer}>
			<textarea
				ref={(text) => Reply.ref = text} // Allow use to capture the textarea input and stick it on the Reply function
				className={replyTextArea}
			  maxLength={140}
			  placeholder="Your response"
			  type="text"
			/>
			<button onClick={() => handleSubmit()} className={darkBtn}>
				Submit
			</button>
		</div>
	)
}

export default function DuckDetails({duckId, isFetching, authedUser, error, addAndHandleReply}) {
	return(
		<div>
			{isFetching === true
				? <p className={subHeader}>Fetching</p>
				: <div className={container}>
						<div className={content}>
							<DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true}/>
							<Reply submit={(replyText) => addAndHandleReply(duckId, formatReply(authedUser, replyText))}/>
						</div>
						<div className={repliesContainer}>
							<RepliesContainer duckId={duckId} />
						</div>
					</div>
			}
			{error ? <p className={errorMsg}>{error}</p> : null}
		</div>
	)
}

DuckDetails.propTypes = {
	authedUser: PropTypes.object.isRequired,
	duckId: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	addAndHandleReply: PropTypes.func.isRequired
};