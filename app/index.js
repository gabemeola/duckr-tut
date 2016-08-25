import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getRoutes from './config/routes';
import users from 'redux/modules/users';
import { checkIfAuthed } from 'helpers/auth';

const store = createStore(users, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f // Lets us view Redux store using Redux Chrome Extension
));

function checkAuth(nextState, replace) {
	if(store.getState().isFetching === true) { // Don't Check Auth if fetching
		return;
	}

	const isAuthed = checkIfAuthed(store);
	const nextPathName = nextState.location.pathname;
	if (nextPathName === '/' || nextPathName === '/auth') {
		if (isAuthed === true) {
			replace('/feed')
		}
	} else {
		if (isAuthed !== true) {
			replace('/auth')
		}
	}
}

ReactDOM.render(
	<Provider store={store}>
		{getRoutes(checkAuth)}
	</Provider>,
	document.getElementById('app')
);