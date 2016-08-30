import React, { PropTypes } from "react";
import { newDuckContainer, header } from './styles.css';
//import { DuckContainer } from 'containers';
import { errorMsg } from 'sharedStyles/styles.css';

function NewDucksAvailable({handleClick}) {
	return (
		<div className={newDuckContainer} onClick={handleClick}>
			New Ducks Available
		</div>
	)
}

NewDucksAvailable.propTypes = {
	handleClick: PropTypes.func.isRequired
};

function Feed(props) {
	return props.isFetching === true
		? <h1 className={header}>Fetching</h1>
		: <div>
				{props.newDucksAvailable ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} /> : null }
				{props.duckIds.length === 0
					? <p className={header}>This is unfortunate. <br/> It appears there are no ducks yet</p>
					: null
				}
				{props.duckIds.map((id) => (
					<p>Duck Id: {id}</p>
				))}
				{props.error ? <p className={errorMsg}>{props.error}</p> : null }
			</div>
}

Feed.propTypes = {
	duckIds: PropTypes.array.isRequired,
	error: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	newDucksAvailable: PropTypes.bool.isRequired,
	resetNewDucksAvailable: PropTypes.func.isRequired
};

export default Feed;