const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

const initialState = {
    value: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT: {
            return {
                ...state,
                value: state.value + 1
            };
        }

        case DECREMENT: {
            return {
                ...state,
                value: state.value - 1
            };
        }

        default:
            return state;
    }
}

export function increment() {
    return {
        type: INCREMENT
    };
}

export function decrement() {
    return {
        type: DECREMENT
    };
}
