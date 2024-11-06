// Manage routes/paths to MovieController
import express from "express";
import MovieController from "./movie.controller.js";
// Initialize Express Router
const movieRouter = express.Router();
const movieController = new MovieController();
// All the paths to controller methods
movieRouter.get("/", movieController.getAllMovies);
export default movieRouter;
