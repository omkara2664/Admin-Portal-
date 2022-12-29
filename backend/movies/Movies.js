const express = require("express");
const router = express.Router();
const movieModel = require("./Movies.model")
const movies = require("../dbjson/Movies");
const userFavoriteModel = require("../models/user.favorite.model");


router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Action", "Romance", "Fantasy", "Drama", "Crime",
            "Adventure", "Thriller", "Sci-fi", "Music", "Family"
        ];
        genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const movies = await movieModel.find({ name: { $regex: search, $options: "i" } })
            .where("genre").in([...genre]).sort(sortBy).skip(page * limit).limit(limit);

        const total = await movieModel.countDocuments({
            genre: { $in: [...genre] }, name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genre,
            genres: genreOptions,
            movies,
        };
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    const movieId = req.params.id;
    const response = {
        success: true,
        code: 200,
        message: "movie list",
        error: null,
        data: null,
        resource: req.originalUrl,
    }
    try {

        const movie = await movieModel.findOne({ _id: movieId });
        if (!movie) throw new Error("movie does not exist");
        response.data = { movie }
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
})




// const insertMovies = async () => {
//     try {
//         const docs = await movieModel.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// insertMovies().then((docs) => console.log(docs)).catch((err) => console.log(err));


module.exports = router;