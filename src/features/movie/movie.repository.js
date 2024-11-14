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
  // movies should have minYear, minImdb, minFullhdSize and category
  async filter(
    minYear,
    minImdb,
    minFullhdSize,
    category
  ) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minYear) {
        filterExpression.year = { $gte: minYear };
      }
      if (minImdb) {
        filterExpression.imdb = { $gte: minImdb };
      }
      if (minFullhdSize) {
        filterExpression.fullhdSize = { $gte: minFullhdSize };
      }
      // using '$and' operator
      if (category) {
        filterExpression = { $and: [{ category: category }, filterExpression]}
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
      // 1. Removes existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(movieID),
        },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } },
        }
      );
      // 2. Add new entry
      await collection.updateOne(
        {
          _id: new ObjectId(movieID),
        },
        {
          $push: { ratings: { userID: new ObjectId(userID), rating } },
        }
      );
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default MovieRepository;
