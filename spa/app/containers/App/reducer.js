/*
 * AppReducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';

/**
 * Глабальный стейт приложения
 */
const initialState = fromJS({
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.set('error', initialState.get('error'));
        default:
            return state;
    }
}

export default appReducer;
