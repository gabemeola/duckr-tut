import ReactDOM from 'react-dom';
import routes from './config/routes'
import { createStore } from 'redux';
import users from 'redux/modules/users'

const store = createStore(users);
console.log(store);

ReactDOM.render(
	routes,
	document.getElementById('app')
);