// Manage routes/paths to MovieController
import express from "express";
import MovieController from "./movie.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
// Initialize Express Router
const movieRouter = express.Router();
const movieController = new MovieController();
// All the paths to controller methods
movieRouter.get("/", (req, res) => {
  movieController.getAllMovies(req, res);
});
movieRouter.get("/ratings", (req, res) => {
  movieController.getAllRatings(req, res);
});
movieRouter.get("/categories", (req, res) => {
  movieController.getAllCategories(req, res);
});
movieRouter.post("/", upload.single("imageUrl"), (req, res, next) => {
  movieController.addMovie(req, res, next);
});
movieRouter.post("/rate", (req, res, next) => {
  movieController.rateMovie(req, res, next);
});
movieRouter.get("/filter", (req, res) => {
  movieController.filterMovies(req, res);
});
movieRouter.get("/averageImdb", (req, res) => {
  movieController.averageImdb(req, res);
});
movieRouter.get("/averageRating", (req, res, next) => {
  movieController.averageRating(req, res, next);
});
movieRouter.get("/countofRating", (req, res, next) => {
  movieController.countOfRating(req, res, next);
});
movieRouter.get("/:id", (req, res) => {
  movieController.getOneMovie(req, res);
});
export default movieRouter;
