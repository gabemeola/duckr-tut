const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER ='FETCHING_USER';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
const FETCHING_USER_SUCCESS ='FETCHING_USER_SUCCESS';

export function authUser(uid) { // Action Creators
	return {
		type: AUTH_USER,
		uid
	}
}

export function unauthUser() {
	return {
		type: UNAUTH_USER
	}
}

export function fetchingUser() {
	return {
		type: FETCHING_USER
	}
}

export function fetchingUserFailure(error) {
	console.warn(error);
	return {
		type: FETCHING_USER_FAILURE,
		error: 'Error Fetching User.'
	}
}

export function fetchingUserSuccess(uid, user, timestamp) {
	return {
		type: FETCHING_USER_SUCCESS,
		uid,
		user,
		timestamp
	}
}

const initialUserState = {
	lastUpdated: 0,
	info: {
		name: '',
		uid: '',
		avatar: ''
	}
};

export default function user(state = initialUserState, action) {  // Redux Reducers
	switch (action.type) {
		case AUTH_USER :
			return {
				...state,
				isAuthed: true,
				authedId: action.uid
			};
		case UNAUTH_USER :
			return {
				...state,
				isAuthed: false,
				authedId: ''
			};
		case FETCHING_USER :
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		case FETCHING_USER_SUCCESS :
			return action.user === null
				? {
					...state,
					isFetching: false,
					error: ''
				}
				: {
					...state,
					isFetching: false,
					error: '',
					[action.uid]: user(state[action.uid], action)
				};
		default :
			return state
	}
}