import MovieModel from "./movie.model.js";
class MovieController {
  getAllMovies(req, res) {
    const movies = MovieModel.getAll();
    res.status(200).send(movies);
  }
  addMovie(req, res) {
    const {
      name,
      year,
      imdb,
      desc,
      category,
      fullhdSize,
      ultrahdSize,
      fullhdLink,
      ultrahdLink,
    } = req.body;
    const newMovie = {
      name,
      year,
      imdb,
      desc,
      category,
      fullhdSize,
      ultrahdSize,
      imageUrl: req.file.filename,
      fullhdLink,
      ultrahdLink,
    };
    const createdRecord = MovieModel.add(newMovie);
    res.status(201).send(createdRecord);
  }
}
export default MovieController;
