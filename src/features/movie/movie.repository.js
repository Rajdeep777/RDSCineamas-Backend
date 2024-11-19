import ApplicationError from "../../../error-handler/applicationError.js";
import { getDB } from "../../../config/mongodb.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import movieSchema from "./movie.schema.js";
import reviewSchema from "./review.schema.js";
import categorySchema from "./category.schema.js";
const MovieModel = mongoose.model("Movie", movieSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);
class MovieRepository {
  constructor() {
    this.collection = "movies";
  }
  async add(movieData) {
    try {
      movieData.categories = movieData.category.split(',').map(e => e.trim())
      console.log(movieData);
      // 1. Add the movie
      const newMovie = new MovieModel(movieData);
      const savedMovie = await newMovie.save();
      // 2. Update catagories
      await CategoryModel.updateMany(
        {
          _id: { $in: movieData.categories },
        },
        {
          $push: { movies: new ObjectId(savedMovie._id) },
        }
      );
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async getAll() {
    try {
      const movies = await MovieModel.find();
      return movies;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async get(id) {
    try {
      const movie = await MovieModel.findOne({ _id: new ObjectId(id) });
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
