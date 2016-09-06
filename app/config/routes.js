import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
	MainContainer,
	HomeContainer,
	AuthenticateContainer,
	FeedContainer,
	LogoutContainer,
	UserContainer,
	DuckDetailsContainer
} from 'containers';

function getRoutes(checkAuth) {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={MainContainer}>
				<IndexRoute component={HomeContainer} onEnter={checkAuth}/>
				<Route path="auth" component={AuthenticateContainer} onEnter={checkAuth}/>
				<Route path="feed" component={FeedContainer} onEnter={checkAuth}/>
				<Route path="logout" component={LogoutContainer}/>
				<Route path="/:uid" component={UserContainer} onEnter={checkAuth}/>
				<Route path="/duckDetail/:duckId" component={DuckDetailsContainer} onEnter={checkAuth}/>
			</Route>
		</Router>
	)
}

export default getRoutes;
