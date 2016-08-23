import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
	MainContainer,
	HomeContainer,
	AuthenticateContainer,
	FeedContainer
} from 'containers';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={MainContainer}>
			<IndexRoute component={HomeContainer}/>
			<Route path="auth" component={AuthenticateContainer}/>
			<Route path="feed" component={FeedContainer}/>
		</Route>
	</Router>
);

export default routes;
