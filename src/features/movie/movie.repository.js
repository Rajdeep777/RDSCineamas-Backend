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
  async filter(minYear, minImdb, minFullhdSize, categories) {
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
      // ['Action', 'Comedy', .......]
      categories = JSON.parse(categories.replace(/'/g, '"'));
      console.log(categories);
      // using '$in' operator
      if (categories) {
        filterExpression = {
          $or: [{ category: { $in: categories } }, filterExpression],
        };
      }
      const filterMovie = await collection
        .find(filterExpression)
        .project({ name: 1, imdb: 1, _id: 0, ratings: {$slice: 1}})
        .toArray();
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
