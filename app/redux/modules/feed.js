import { addListener } from 'redux/modules/listeners';
import { listenToFeed } from 'helpers/api';

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER';
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR';
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS';
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED';
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE';

const initialState = {
	newDucksAvailable: false,
	newDucksToAdd: [],
	isFetching: false,
	error: '',
	duckId: []
};

function settingFeedListener() {
	return {
		type: SETTING_FEED_LISTENER
	}
}

function settingFeedListenerError(error) {
	console.warn(error);
	return {
		type: SETTING_FEED_LISTENER_ERROR,
		error: 'Error fetching feeds.'
	}
}

function settingFeedListenerSuccess(ducksIds) {
	return {
		type: SETTING_FEED_LISTENER_SUCCESS,
		ducksIds
	}
}

function addNewDuckIdToFeed(duckId) {
	return {
		type: ADD_NEW_DUCK_ID_TO_FEED,
		duckId
	}
}

export function resetNewDucksAvailable() {
	return {
		type: RESET_NEW_DUCKS_AVAILABLE
	}
}

export function setAndHandleFeedListener() {
	return function(dispatch, getState) {
		if (getState().listeners.feed === true) return;  // If Feed Listener is already set then return out of the function

		dispatch(addListener('feed'));
		dispatch(settingFeedListener());

		listenToFeed(({feed, sortedIds}) => {

		}, (error) => dispatch(settingFeedListenerError(error)))
	}
}

export default function feed(state = initialState, action) {
	switch (action.type) {
		case SETTING_FEED_LISTENER :
			return {
				...state,
				isFetching: true
			};
		case SETTING_FEED_LISTENER_ERROR :
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		case SETTING_FEED_LISTENER_SUCCESS :
			return {
				...state,
				isFetching: false,
				error: '',
				duckIds: action.duckIds,
				newDucksAvailable: false
			};
		case ADD_NEW_DUCK_ID_TO_FEED :
			return {
				...state,
				duckIds: [...state.newDucksToAdd, ...state.duckIds],
				newDucksAvailable: true
			};
		case RESET_NEW_DUCKS_AVAILABLE :
			return {
				...state,
				duckIds: [...state.newDucksToAdd, ...state.duckIds],
				newDucksToAdd: [],
				newDucksAvailable: false
			};
		default :
			return state
	}
}