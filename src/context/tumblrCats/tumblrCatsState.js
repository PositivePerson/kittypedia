import React, { useReducer } from 'react';
import axios from 'axios';
import TumblrCatsContext from './tumblrCatsContext';
import TumblrCatsReducer from './tumblrCatsReducer';
import { SEARCH_CATS, SET_LOADING } from '../types';

const TumblrCatsState = (props) => {

    const initialState = {
        cats: [],
        loading: false
    };

    const [state, dispatch] = useReducer(TumblrCatsReducer, initialState);

    const searchCats = async (text) => {
        setLoading();

        const res = await axios.get(
            // 'https://api.thecatapi.com/v1/images/search'
            `https://api.thecatapi.com/v1/images/search?format=json&limit=10`, {
            headers: {
                'x-api-key': 'DEMO-API-KEY'
                // 'x-api-key': '24cf0cfc-3287-49f4-9207-58811a047369'
            }
        }
        );

        console.log("🚀 ~ file: tumblrCatsState.js ~ line 31 ~ searchCats ~ res", res)

        dispatch({
            type: SEARCH_CATS,
            payload: res.data
        })
    }

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <TumblrCatsContext.Provider
            value={{
                cats: state.cats,
                loading: state.loading,
                searchCats,
                setLoading
            }}
        >
            { props.children}
        </TumblrCatsContext.Provider>
    )


}

export default TumblrCatsState;