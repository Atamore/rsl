import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {ScrollManager} from 'found-scroll';

import createConnectedRouter from 'found/lib/createConnectedRouter';
import resolver from 'found/lib/resolver';

import {hot} from 'react-hot-loader';
import render from 'core/router/render';

import Wrapper from './Wrapper';

class Root extends PureComponent {
    static propTypes = {
        initialRenderArgs: PropTypes.object.isRequired,
        matchContext: PropTypes.object.isRequired
    };

    render() {
        const {matchContext, initialRenderArgs, ...rest} = this.props;

        const ConnectedRouter = createConnectedRouter({
            render: renderArgs => (
                <ScrollManager renderArgs={renderArgs}>
                    {render(renderArgs)}
                </ScrollManager>
            )
        });

        return (
            <Wrapper {...rest}>
                <ConnectedRouter
                    matchContext={matchContext}
                    resolver={resolver}
                    initialRenderArgs={initialRenderArgs}
                />
            </Wrapper>
        );
    }
}

export default hot(module)(Root);
