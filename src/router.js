import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import Container from './page/container'
import Home from './page/home';
import NotFound from './page/notFound';
import About from './page/about';

const router = (
    <Router history={browserHistory}>
    	<Route path='/' component={Container} >
    		<IndexRoute component={Home} />
    		<Route path='home' component={Home} />
        	<Route path='about' component={About} /> 
        	<Route path='*' component={NotFound} />
        </Route>
    </Router>
);

export default router;