import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  name: String,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});
export default categorySchema;
