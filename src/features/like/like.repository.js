import mongoose from "mongoose";
import likeSchema from "./like.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../../error-handler/applicationError.js";
const LikeModel = mongoose.model("Like", likeSchema);
class LikeRepository {
  async likeMovie(userId, movieId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(movieId),
        types: "Movie",
      });
      await newLike.save();
    } catch (error) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        types: "Category",
      });
      await newLike.save();
    } catch (error) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getLikes(type, id) {
    return await LikeModel.find({
      likeable: new ObjectId(id),
      types: type,
    })
      .populate("user")
      .populate({ path: "likeable", model: type });
  }
}
export default LikeRepository;
