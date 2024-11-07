// Manage routes/paths to MovieController
import express from "express";
import MovieController from "./movie.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
// Initialize Express Router
const movieRouter = express.Router();
const movieController = new MovieController();
// All the paths to controller methods
movieRouter.get("/", movieController.getAllMovies);
movieRouter.post("/", upload.single("imageUrl"), movieController.addMovie);
movieRouter.post("/rate", movieController.rateMovie);
movieRouter.get("/filter", movieController.filterMovies);
movieRouter.get("/:id", movieController.getOneMovie);
export default movieRouter;
