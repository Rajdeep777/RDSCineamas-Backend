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
  getOneMovie(req, res) {
    const id = req.params.id;
    const movie = MovieModel.get(id);
    if (!movie) {
      res.status(404).send("Movie not found");
    } else {
      res.status(200).send(movie);
    }
  }
  filterMovies(req, res) {
    const minYear = req.query.minYear;
    const maxYear = req.query.maxYear;
    const minImdb = req.query.minImdb;
    const maxImdb = req.query.maxImdb;
    const minFullhdSize = req.query.minFullhdSize;
    const maxFullhdSize = req.query.maxFullhdSize;
    const minUltrahdSize = req.query.minUltrahdSize;
    const maxUltrahdSize = req.query.maxUltrahdSize;
    const category = req.query.category;
    const result = MovieModel.filter(
      minYear,
      maxYear,
      minImdb,
      maxImdb,
      minFullhdSize,
      maxFullhdSize,
      minUltrahdSize,
      maxUltrahdSize,
      category
    );
    res.status(200).send(result);
  }
  rateMovie(req, res) {
    const { userID, movieID, rating } = req.query;
    const error = MovieModel.rateMovie(userID, movieID, rating);
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(200).send("Rating has been added");
    }
  }
}
export default MovieController;
