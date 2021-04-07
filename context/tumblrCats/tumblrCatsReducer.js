import { SEARCH_CATS, SET_LOADING } from '../types';

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

        default:
            return state
    }
}
