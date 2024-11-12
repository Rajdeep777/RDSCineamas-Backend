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
movieRouter.post("/", upload.single("imageUrl"), (req, res) => {
  movieController.addMovie(req, res);
});
movieRouter.post("/rate", movieController.rateMovie);
movieRouter.get("/filter", movieController.filterMovies);
movieRouter.get("/:id", (req, res) => {
  movieController.getOneMovie(req, res);
});
export default movieRouter;
