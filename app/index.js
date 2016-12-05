import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { checkIfAuthed } from 'helpers/auth';
import getRoutes from './config/routes';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import * as reducers from 'redux/modules';

const store = createStore(
	combineReducers({...reducers, routing: routerReducer}), // Combine App Reducers with Router-Redux reducers as routing
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f // Lets us view Redux store using Redux Chrome Extension
	)
);

const history = syncHistoryWithStore(hashHistory, store); // Creates Our Own History for implementing Redux

function checkAuth(nextState, replace) {
	if(store.getState().users.isFetching === true) { // Don't Check Auth if fetching
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
		{getRoutes(checkAuth, history)}
	</Provider>,
	document.getElementById('app')
);