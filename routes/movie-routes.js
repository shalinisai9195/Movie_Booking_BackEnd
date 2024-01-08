import express from 'express';
import {addMovie,getMovies,getMovieById} from '../controllers/movie-controller.js'

const movieRouter = express.Router();

movieRouter.post("/",addMovie);
movieRouter.get("/",getMovies);
movieRouter.get("/:id",getMovieById);

export default movieRouter;