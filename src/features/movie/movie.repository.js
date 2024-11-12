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
      console.log(error);
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
      console.log(error);
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default MovieRepository;
