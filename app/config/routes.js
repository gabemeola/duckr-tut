import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
	MainContainer,
	HomeContainer,
	AuthenticateContainer,
	FeedContainer
} from 'containers';

function getRoutes(checkAuth) {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={MainContainer}>
				<IndexRoute component={HomeContainer} onEnter={checkAuth}/>
				<Route path="auth" component={AuthenticateContainer} onEnter={checkAuth}/>
				<Route path="feed" component={FeedContainer} onEnter={checkAuth}/>
			</Route>
		</Router>
	)
}

export default getRoutes;
