import { fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
	incrementNumberOfLikes, decrementNumberOfLikes} from 'helpers/api';

export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
const FETCHING_LIKES = 'FETCHING_LIKES';
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR';
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS';

const initialState = {
	isFetching: false,
	error: ''
};

function addLike(duckId) {
	return {
		type: ADD_LIKE,
		duckId
	}
}

function removeLike(duckId) {
	return {
		type: REMOVE_LIKE,
		duckId
	}
}

function fetchingLikes() {
	return {
		type: FETCHING_LIKES
	}
}

function fetchLikesError(error) {
	console.warn(error);
	return {
		type: FETCHING_LIKES_ERROR,
		error: 'Error fetching likes'
	}
}

function fetchingLikesSuccess(likes) {
	return {
		type: FETCHING_LIKES_SUCCESS,
		likes
	}
}

export function addAndHandleLike(duckId, event) {
	event.stopPropagation();
	return function (dispatch, getState) {
		// Optimistic Redux Updates
		dispatch(addLike(duckId)); // Save like to local redux store

		const uid = getState().users.authedId; // Save like to Firebase database
		Promise.all([
			saveToUsersLikes(uid, duckId),
			incrementNumberOfLikes(duckId)
		]).catch((error) => {
			console.warn(error);
			dispatch(removeLike(duckId)); // If there is a error saving to Firebase remove like count on Redux Store
		})
	}
}

export function handleDeleteLike(duckId, event) {
	event.stopPropagation();
	return function (dispatch, getState) {
		// Optimistic Redux Updates
		dispatch(removeLike(duckId));

		const uid = getState().users.authedId;
		Promise.all([
			deleteFromUsersLikes(uid, duckId),
			decrementNumberOfLikes(duckId)
		]).catch((error) => {
			console.warn(error);
			dispatch(addLike(duckId));
		})
	}
}

export function setUsersLikes(name) {
	return function (dispatch, getState) {
		const uid = getState().users.authedId;
		dispatch(fetchingLikes());
		fetchUsersLikes(uid)
			.then((likes) => dispatch(fetchingLikesSuccess(likes)))
			.catch((error) => dispatch(fetchLikesError(error)))
	}
}

export default function usersLikes(state = initialState, action) {
	const type = action.type;
	switch (type) {
		case FETCHING_LIKES :
			return {
				...state,
				isFetching: true
			};
		case FETCHING_LIKES_ERROR :
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		case FETCHING_LIKES_SUCCESS :
			return {
				...state,
				...action.likes,
				isFetching: false,
				error: ''
			};
		case ADD_LIKE :
			return {
				...state,
				[action.duckId]: true
			};
		case REMOVE_LIKE :
			return Object.keys(state)
				.filter((duckId) => action.duckId !== duckId)
				.reduce((prev, current) => {
					prev[current] = state[current];
					return prev
				}, {});
		default :
			return state
	}
}