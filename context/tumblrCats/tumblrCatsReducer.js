import { SEARCH_CATS, SET_LOADING, SET_TYPE } from '../types';

export default (state, { type, payload }) => {
    switch (type) {

        case SEARCH_CATS:
            return {
                ...state,
                cats: payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_TYPE:
            return {
                ...state,
                contentType: payload
            }

        default:
            return state
    }
}
