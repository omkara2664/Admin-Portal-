import { configureStore } from "@reduxjs/toolkit";
import favoriteMoviesReducer from './FavoireMovieSlice'

const Store = configureStore({
    reducer: {
        FavMovies: favoriteMoviesReducer,
    }
})

export default Store;