import {createStore as _createStore, compose} from 'redux';

import {createHistoryEnhancer, queryMiddleware} from 'farce';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';

export default function createStore({historyProtocol, matcher, data}) {
    const reducers = require('./reducers').default;

    const defaultMiddleware = [
        createHistoryEnhancer({
            protocol: historyProtocol,
            middlewares: [queryMiddleware]
        }),
        createMatchEnhancer(matcher)
    ];

    const middleware =
        __DEVELOPMENT__ && __CLIENT__
            ? [
                  ...defaultMiddleware,
                  window.__REDUX_DEVTOOLS_EXTENSION__
                      ? window.__REDUX_DEVTOOLS_EXTENSION__()
                      : f => f
              ]
            : defaultMiddleware;

    const store = compose(...middleware)(_createStore)(reducers, data);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./reducers', () => {
            const newReducers = require('./reducers').default;

            store.replaceReducer(newReducers);
        });
    }

    return store;
}
