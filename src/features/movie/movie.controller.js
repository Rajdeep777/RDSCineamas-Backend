import MovieModel from "./movie.model.js";
class MovieController {
  getAllMovies(req, res) {
    const movies = MovieModel.getAll();
    res.status(200).send(movies);
  }
  addMovie(req, res) {
    console.log(req.body);
    console.log("This is a post request");
    res.status(200).send("Post request received!!!");
  }
}
export default MovieController;
