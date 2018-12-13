import React, {PureComponent} from 'react';

import {hot} from 'react-hot-loader';

import {Helmet} from 'react-helmet';

class App extends PureComponent {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Sample app</title>
                </Helmet>

                <h1>Hello world!</h1>

                <p>Sample content</p>
            </div>
        );
    }
}

export default hot(module)(App);
