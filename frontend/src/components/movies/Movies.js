import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Search from './Search';
import Pagination from "./Pagination"
import Sort from './Sort';
import Genre from "./Genre";
import Table from './Table';
import "./Movies.css";
import { MoviesNavbar } from './navbar.movie/movies.navbar';
import { useNavigate } from 'react-router-dom';


export const Movies = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "rating", order: "desc" });
    const [filterGenre, setFilterGenre] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const handleOnFavorite = () => {
        navigate('/favorite');
    }

    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const url = `http://localhost:3002/api/movies?page=${page}&sort=${sort.sort},${sort.order}&genre=${filterGenre.toString()}&search=${search}`;
                const { data } = await axios.get(url);
                setObj(data);
            } catch (error) {
                console.error(error);
            }
        };
        getAllMovies();
    }, [sort, filterGenre, page, search]);
    return (
        <>
            <MoviesNavbar />
            <div className='movieWrapper'>
                <div className="movieContainer">
                    <div className="movieHead">
                        <img src={require("./images/logo.png")} alt="logo" className='IMDBLogo' />
                        <Search setSearch={(search) => setSearch(search)} />
                    </div>
                    <div className="movieBody">
                        <div className="movieTable_container">
                            <Table movies={obj.movies ? obj.movies : []} />
                            <Pagination
                                page={page}
                                limit={obj.limit ? obj.limit : 0}
                                total={obj.total ? obj.total : 0}
                                setPage={(page) => setPage(page)}

                            />
                        </div>
                        <div className="movieFilter_container">
                            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                            <Genre
                                filterGenre={filterGenre}
                                genres={obj.genres ? obj.genres : []}
                                setFilterGenre={(genre) => setFilterGenre(genre)}
                            />
                            <button className="btn btn-outline-primary" onClick={handleOnFavorite}> Go to Favorite</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
