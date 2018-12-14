import React from 'react';
import ReactDOM from 'react-dom/server';

import config from 'config';

import {serializeData, generateClientData} from 'utils/data';

import createStore from 'core/redux/createStore';

import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

import {Actions as FarceActions, ServerProtocol} from 'farce';
import Matcher from 'found/lib/Matcher';
import {RouterProvider} from 'found/lib/server';
import {
    getStoreRenderArgs,
    resolver,
    RedirectException,
    HttpError
} from 'found';

import routeConfig from 'core/router/routeConfig';
import render from 'core/router/render';

import Wrapper from 'core/helpers/Wrapper';
import Html from 'core/helpers/Html';

export default async function defaultHandler(req, res, chunks) {
    const matcher = new Matcher(routeConfig);

    const url = `${req.urlData('path')}?${req.urlData('query') || ''}`;

    const store = createStore({
        historyProtocol: new ServerProtocol(url),
        matcher,
        data: {}
    });

    try {
        store.dispatch(FarceActions.init());

        const matchContext = {store};

        const renderArgs = await getStoreRenderArgs({
            store,
            matchContext,
            resolver
        });

        const data = serializeData({
            data: store.getState(),
            config
        });

        const sheet = new ServerStyleSheet();

        const markup = ReactDOM.renderToString(
            <StyleSheetManager sheet={sheet.instance}>
                <Wrapper store={store}>
                    <RouterProvider router={renderArgs.router}>
                        {render(renderArgs)}
                    </RouterProvider>
                </Wrapper>
            </StyleSheetManager>
        );

        const content = ReactDOM.renderToString(
            <Html
                assets={chunks}
                markup={markup}
                data={generateClientData(data)}
                sheet={sheet}
            />
        );

        if (renderArgs.error && renderArgs.error instanceof HttpError) {
            res.code(renderArgs.error.status);
        } else {
            res.code(200);
        }

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.send(`<!doctype html>\n${content}`);
    } catch (e) {
        if (e instanceof RedirectException) {
            res.redirect(302, store.farce.createHref(e.location));
            return;
        }

        throw e;
    }
}
