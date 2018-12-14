import React from 'react';
import ReactDOM from 'react-dom';

import ignoreWarnings from 'ignore-warnings';

import {deserializeData, getClientData} from 'utils/data';

import {BrowserProtocol} from 'farce';
import Matcher from 'found/lib/Matcher';
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs';
import resolver from 'found/lib/resolver';

import createStore from 'core/redux/createStore';

import ClientRoot from 'core/helpers/ClientRoot';
import routeConfig from 'core/router/routeConfig';

const dest = document.getElementById('content');

const data = deserializeData(getClientData());

(async () => {
    const matcher = new Matcher(routeConfig);

    const store = createStore({
        historyProtocol: new BrowserProtocol(),
        matcher,
        data: data.data
    });

    const matchContext = {store};

    const initialRenderArgs = await getStoreRenderArgs({
        store,
        matchContext,
        resolver
    });

    const component = (
        <ClientRoot
            store={store}
            matchContext={matchContext}
            initialRenderArgs={initialRenderArgs}
        />
    );

    ReactDOM.hydrate(component, dest);

    if (module.hot) {
        module.hot.accept('core/router/routeConfig', async () => {
            const renderArgs = await getStoreRenderArgs({
                store,
                matchContext,
                resolver
            });

            const newComponent = (
                <ClientRoot
                    store={store}
                    matchContext={matchContext}
                    initialRenderArgs={renderArgs}
                />
            );

            ReactDOM.render(newComponent, dest);
        });
    }
})();

ignoreWarnings('error', ['reconciliation failed could not dive into']);

if (process.env.NODE_ENV !== 'production') {
    window.React = React;
}
