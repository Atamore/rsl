import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import theme from 'theme';

export default class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,

        store: PropTypes.object.isRequired
    };

    render() {
        const {store, children} = this.props;

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </Provider>
        );
    }
}
