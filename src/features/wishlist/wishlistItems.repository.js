import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import ApplicationError from "../../../error-handler/applicationError.js";
class WishlistItemsRepository {
  constructor() {
    this.collection = "wishlist";
  }
  async add(movieID, userID, numberOfMovies) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne({
        movieID: new ObjectId(movieID),
        userID: new ObjectId(userID),
        numberOfMovies,
      });
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async get(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async delete(userID, wishlistItemID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(wishlistItemID),
        userID: new ObjectId(userID),
      });
      return result.deletedCount > 0;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default WishlistItemsRepository;
