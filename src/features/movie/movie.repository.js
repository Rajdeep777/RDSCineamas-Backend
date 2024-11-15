import ApplicationError from "../../../error-handler/applicationError.js";
import { getDB } from "../../../config/mongodb.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import movieSchema from "./movie.schema.js";
import reviewSchema from "./review.schema.js";
const MovieModel = mongoose.model("Movie", movieSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
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
      // 1. Check if movie exists
      const movieToUpdate = await MovieModel.findById(movieID);
      if (!movieToUpdate) {
        throw new Error("Movie not found");
      } else {
        // 2. Get the existing review
        const userReview = await ReviewModel.findOne({
          movie: new ObjectId(movieID),
          user: new ObjectId(userID),
        });
        if (userReview) {
          userReview.rating = rating;
          await userReview.save();
        } else {
          const newReview = ReviewModel({
            movie: new ObjectId(movieID),
            user: new ObjectId(userID),
            rating: rating,
          });
          newReview.save();
        }
      }
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async averageMovieImdbPerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            // 1. Get average Imdb per category
            $group: {
              _id: "$category",
              averageImdb: { $avg: "$imdb" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async averageMovieRating() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          // 1. Create documents for ratings
          {
            $unwind: "$ratings",
          },
          // 2. Group rating per movie and get average
          {
            $group: {
              _id: "$name",
              averageRating: { $avg: "$ratings.rating" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async countOfMovieRating() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          // 1. Project name of movie and count of rating
          {
            $project: {
              name: 1,
              countOfRating: {
                $cond: {
                  if: { $isArray: "$ratings" },
                  then: { $size: "$ratings" },
                  else: 0,
                },
              },
            },
          },
          // 2. Sort the collection
          {
            $sort: { countOfRating: -1 },
          },
          // Limit to just 1 item in result
          {
            $limit: 1,
          },
        ])
        .toArray();
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default MovieRepository;
