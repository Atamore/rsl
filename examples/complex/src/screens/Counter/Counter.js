import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {increment, decrement} from 'modules/counter';

import {connect} from 'react-redux';

import {Helmet} from 'react-helmet';

import {Wrapper, Value, Actions, Button} from './styled';

class Counter extends PureComponent {
    static propTypes = {
        counter: PropTypes.number.isRequired,

        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired
    };

    render() {
        const {counter, increment, decrement} = this.props;

        return (
            <Wrapper>
                <Helmet>
                    <title>Counter page</title>
                </Helmet>

                <Value>{counter}</Value>

                <Actions>
                    <Button type="button" onClick={increment}>
                        Increment
                    </Button>
                    <Button type="button" onClick={decrement}>
                        Decrement
                    </Button>
                </Actions>
            </Wrapper>
        );
    }
}

export default connect(
    state => ({
        counter: state.counter.value
    }),
    {increment, decrement}
)(Counter);
