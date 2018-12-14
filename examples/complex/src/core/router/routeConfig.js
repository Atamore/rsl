import React from 'react';

import {makeRouteConfig, Route, Redirect, hotRouteConfig} from 'found';

import App from 'screens/App/App';
import Home from 'screens/Home/Home';
import Counter from 'screens/Counter/Counter';

const routeConfig = makeRouteConfig(
    <Route path="/" Component={App}>
        <Route Component={Home} />

        <Route path="/counter" Component={Counter} />

        <Redirect from="/redirect" to="/counter" />
    </Route>
);

export default hotRouteConfig(routeConfig);
