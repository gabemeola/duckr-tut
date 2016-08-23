import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from './config/routes';
import users from 'redux/modules/users';

const store = createStore(users, applyMiddleware(thunk));
console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('app')
);