import React from 'react';
import ReactDOM from 'react-dom';

import {App} from 'screens';

const dest = document.getElementById('content');

const component = <App />;

ReactDOM.hydrate(component, dest);

if (process.env.NODE_ENV !== 'production') {
    window.React = React;
}
