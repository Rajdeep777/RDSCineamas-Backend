import mongoose from "mongoose";
const likeSchema = mongoose
  .Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "types",
    },
    types: {
      type: String,
      enum: ["Movie", "Category"],
    },
  })
  .pre("save", (next) => {
    console.log("New like coming in");
    next();
  })
  .post("save", (doc) => {
    console.log("Like is saved");
    console.log(doc);
  })
  .pre("find", (next) => {
    console.log("Retrieving Likes");
    next();
  })
  .post("find", (docs) => {
    console.log("Find is completed");
    console.log(docs);
  });
export default likeSchema;
