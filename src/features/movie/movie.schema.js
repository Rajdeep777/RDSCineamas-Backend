import mongoose from "mongoose";
const movieSchema = mongoose.Schema({
  name: String,
  year: Number,
  imdb: Number,
  desc: String,
  category: String,
  fullhdSize: String,
  ultrahdSize: String,
  fullhdLink: String,
  ultrahdLink: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
export default movieSchema;
