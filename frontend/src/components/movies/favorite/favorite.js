
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './../Table/styles.module.css';
import { useNavigate } from 'react-router-dom';
import { removeItem, saveFavoriteList, setStatus } from '../../store/FavoireMovieSlice';
import { STATUSES } from './../../store/FavoireMovieSlice';


export const Favorite = () => {
    const { data: movies } = useSelector(state => state.FavMovies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigate('/movies');
    }

    const handleOnRemove = (id) => {
        dispatch(removeItem(id));
        dispatch(setStatus(STATUSES.IDEAL));
    }

    const handleOnFavSave = () => {
        let moviesArray = movies.map(movie => movie._id);
        const token = localStorage.getItem("userAccessToken");
        dispatch(saveFavoriteList(moviesArray, token));
    }
    return (
        <div className='movieWrapper'>
            <div className="movieContainer">
                <div className="movieHead">
                    <img src={require("../images/logo.png")} alt="logo" className='IMDBLogo' />
                </div>
                <div className="movieBody">
                    <div className="movieTable_container">
                        <div className={styles.container}>
                            <div className={styles.heading}>
                                <p className={styles.title_tab}>Title</p>
                                <p className={styles.genre_tab}>Genre</p>
                                <p className={styles.rating_tab}>Rating</p>
                            </div>
                            {movies.map((movie) => (
                                <div className={styles.movie} key={movie._id}>
                                    <div className={styles.title_container}>
                                        <img src={movie.img} alt="movie" className={styles.movie_img} />
                                        <p className={styles.movie_title}>
                                            {movie.name} ({movie.year})
                                        </p>
                                    </div>
                                    <div className={styles.genre_container}>
                                        {movie.genre.map((genre, index) => (
                                            <p key={genre} className={styles.movie_genre}>
                                                {genre}
                                                {index !== movie.genre.length - 1 && "/"}
                                            </p>
                                        ))}
                                    </div>
                                    <div className={styles.rating_container}>
                                        <img
                                            src="./images/star.png"
                                            alt="star"
                                            className={styles.star_img}
                                        />
                                        <p className={styles.movie_rating}>{movie.rating}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleOnRemove(movie._id)} className="btn btn-danger " style={{ marginRight: "1rem" }}>Remove</button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
                <div style={{ marginBottom: "2rem" }}>
                    <button onClick={handleBack} className="btn btn btn-dark " style={{ marginRight: "1rem", marginLeft: "2rem" }}>Back</button>
                    <button onClick={handleOnFavSave} className="btn btn btn-warning " style={{ marginRight: "1rem" }}>Save</button>
                </div>
            </div>

        </div>
    )
}

