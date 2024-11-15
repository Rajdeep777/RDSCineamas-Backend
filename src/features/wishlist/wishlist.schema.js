import mongoose from "mongoose";
const wishlistSchema = mongoose.Schema({
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  numberOfMovies: Number,
});
export default wishlistSchema;
