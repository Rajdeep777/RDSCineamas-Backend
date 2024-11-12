import ApplicationError from "../../../error-handler/applicationError.js";
import { getDB } from "../../../config/mongodb.js";
import { ObjectId } from "mongodb";
class MovieRepository {
  constructor() {
    this.collection = "movies";
  }
  async add(newMovie) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newMovie);
      return newMovie;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const movies = await collection.find().toArray();
      return movies;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const movie = await collection.findOne({ _id: new ObjectId(id) });
      return movie;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async filter(
    minYear,
    maxYear,
    minImdb,
    maxImdb,
    minFullhdSize,
    maxFullhdSize,
    category
  ) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const filterExpression = {};
      if (minYear) {
        filterExpression.year = { $gte: minYear };
      }
      if (maxYear) {
        filterExpression.year = { ...filterExpression.year, $lte: maxYear };
      }
      if (minImdb) {
        filterExpression.imdb = { $gte: minImdb };
      }
      if (maxImdb) {
        filterExpression.imdb = { ...filterExpression.imdb, $lte: maxImdb };
      }
      if (minFullhdSize) {
        filterExpression.fullhdSize = { $gte: minFullhdSize };
      }
      if (maxFullhdSize) {
        filterExpression.fullhdSize = {
          ...filterExpression.fullhdSize,
          $lte: maxFullhdSize,
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      const filterMovie = await collection.find(filterExpression).toArray();
      return filterMovie;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async rate(userID, movieID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      collection.updateOne(
        { _id: new ObjectId(movieID) },
        {
          $push: { rating: { userID: new ObjectId(userID), rating } },
        }
      );
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default MovieRepository;
