import {combineReducers} from 'redux';

import found from 'found/lib/foundReducer';

import counter from 'modules/counter';

export default combineReducers({
    found,
    counter
});
