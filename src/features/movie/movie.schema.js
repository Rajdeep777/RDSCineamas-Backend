import mongoose from "mongoose";
const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Movie name is required"],
    maxLength: [30, "Name can't be greater than 30 characters"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    min: [1980, "Year must be after 1980"],
    max: [new Date().getFullYear(), `Year can't be in the future`],
  },
  imdb: {
    type: Number,
    required: [true, "IMDB rating is required"],
    min: [1, "IMDB rating must be at least 1"],
    max: [10, "IMDB rating must be at most 10"],
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
    minLength: [30, "Description must be at least 30 characters"],
    maxLength: [500, "Description can't be more than 500 characters"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  fullhdSize: {
    type: Number,
    required: [true, "Full HD size is required"],
    min: [1, "Full HD size must be at least 1GB"],
  },
  ultrahdSize: {
    type: Number,
    required: [true, "Ultra HD size is required"],
    min: [3, "Ultra HD size must be at least 3GB"],
  },
  fullhdLink: {
    type: String,
    required: [true, "Full HD link is required"],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[\w.-]+\.[a-z]{2,}\/?.*$/.test(v);
      },
      message: "Full HD link must be a valid URL",
    },
  },
  ultrahdLink: {
    type: String,
    required: [true, "Ultra HD link is required"],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[\w.-]+\.[a-z]{2,}\/?.*$/.test(v);
      },
      message: "Ultra HD link must be a valid URL",
    },
  },
  imageUrl: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});
export default movieSchema;
