import MovieModel from "./movie.model.js";
import MovieRepository from "./movie.repository.js";
class MovieController {
  constructor() {
    this.movieRepository = new MovieRepository();
  }
  async getAllMovies(req, res) {
    try {
      const movies = await this.movieRepository.getAll();
      res.status(200).send(movies);
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
  async addMovie(req, res) {
    try {
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
      const newMovie = new MovieModel(
        name,
        year,
        imdb,
        desc,
        category,
        fullhdSize,
        ultrahdSize,
        req.file.filename,
        fullhdLink,
        ultrahdLink
      );
      console.log(newMovie);
      const createdMovie = await this.movieRepository.add(newMovie);
      res.status(201).send(createdMovie);
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
  async getOneMovie(req, res) {
    try {
      const id = req.params.id;
      const movie = await this.movieRepository.get(id);
      if (!movie) {
        res.status(404).send("Movie not found");
      } else {
        res.status(200).send(movie);
      }
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
  async filterMovies(req, res) {
    try {
      const minYear = req.query.minYear;
      const maxYear = req.query.maxYear;
      const minImdb = req.query.minImdb;
      const maxImdb = req.query.maxImdb;
      const minFullhdSize = req.query.minFullhdSize;
      const maxFullhdSize = req.query.maxFullhdSize;
      const category = req.query.category;
      const result = await this.movieRepository.filter(
        minYear,
        maxYear,
        minImdb,
        maxImdb,
        minFullhdSize,
        maxFullhdSize,
        category
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
  async rateMovie(req, res, next) {
    try {
      const userID = req.userID;
      const { movieID, rating } = req.body;
      await this.movieRepository.rate(userID, movieID, rating);
      return res.status(200).send("Rating has been added");
    } catch (err) {
      console.log("Passing error to middleware");
      next(err);
    }
  }
  async averageImdb(req, res, next) {
    try {
      const result = await this.movieRepository.averageMovieImdbPerCategory();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
  async averageRating(req, res, next) {
    try {
      const result = await this.movieRepository.averageMovieRating();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
}
export default MovieController;
