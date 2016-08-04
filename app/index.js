import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {
	render() {
		return(
			<p>Hello World</p>
		)
	}
}

ReactDOM.render(
	<Main/>,
	document.getElementById('app')
);