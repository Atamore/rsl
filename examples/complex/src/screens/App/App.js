import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import GlobalStyles from 'theme/globals';

import {Link} from 'found';

import {Wrapper, Nav, Content} from './styled';

export default class App extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    static defaultProps = {
        children: null
    };

    render() {
        const {children} = this.props;

        return (
            <Wrapper>
                <GlobalStyles />

                <Helmet>
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto"
                        rel="stylesheet"
                    />
                </Helmet>

                <h1>Complex example</h1>

                <Nav>
                    <Link to="/">Home</Link>

                    <Link to="/counter">Counter</Link>
                </Nav>

                <Nav>
                    <Link to="/redirect">Client redirect</Link>

                    <a href="/redirect">Server redirect</a>
                </Nav>

                <Content>{children}</Content>
            </Wrapper>
        );
    }
}
