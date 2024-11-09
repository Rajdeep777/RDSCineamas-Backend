import { getDB } from "../../../config/mongodb.js";
import ApplicationError from "../../../error-handler/applicationError.js";
class UserRepository {
  async signUp(newUser) {
    try {
      // 1. Get the database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection("users");
      // 3. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async signIn(email, password) {
    try {
      // 1. Get the database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection("users");
      // 3. Find the document
      return await collection.findOne({ email, password });
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default UserRepository;
