import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    LOADING: 'loading',
    IDEAL: 'ideal',
    ERROR: 'error'
});

const favoriteMovieSlice = createSlice({
    name: 'favMovie',
    initialState: {
        data: [],
        status: STATUSES.IDEAL,
        favMoviesData: [],
    },
    reducers: {
        setData(state, action) {
            state.data.push(action.payload);
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        removeItem(state, action) {
            const movies = state.data.filter(item => item._id !== action.payload);
            state.data = movies;
        },
        setFavorite(state, action) {
            state.favMoviesData.push(action.payload);
        }


    }
});

export const { setData, setStatus, removeItem, setFavorite } = favoriteMovieSlice.actions;
export default favoriteMovieSlice.reducer;


export const fetchFavoriteMovies = (id) => {
    return async (dispatch) => {
        dispatch(setStatus(STATUSES.LOADING));
        axios.get(`http://localhost:3002/api/movies/${id}`, {

        }).then((response) => {
            const movies = response.data.data.movie;
            // console.log(response);
            dispatch(setData(movies))
            dispatch(setStatus(STATUSES.IDEAL));
        }).catch((error) => {
            console.error(error);
            dispatch(setStatus(STATUSES.ERROR));
        });
    }
}

export const saveFavoriteList = (data, token) => {
    return async (dispatch) => {
        dispatch(setStatus(STATUSES.LOADING));
        axios.post("http://localhost:3002/api/user/userfavorite", data, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            },
        }).then((response) => {
            const movieIds = response.data.data;
            console.log(movieIds);
            dispatch(setFavorite(movieIds));
            dispatch(setStatus(STATUSES.IDEAL));
        }).catch((error) => {
            console.error(error);
            dispatch(setStatus(STATUSES.ERROR));
        });
    }
}


