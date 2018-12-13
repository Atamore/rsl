import React from 'react';
import ReactDOM from 'react-dom/server';

import {App} from 'screens';
import Html from 'core/helpers/Html';

export default async function defaultHandler(req, res, chunks) {
    const component = <App />;

    const content = ReactDOM.renderToString(
        <Html assets={chunks} component={component} />
    );

    res.code(200);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!doctype html>\n${content}`);
}
