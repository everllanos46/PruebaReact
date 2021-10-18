import * as constants from '../../constants';

export default function universalReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_COUNTRIES:
            return action._payload;
        case constants.GET_CITIES:
            return action.payload;
        default:   
            return state;
    }
}



