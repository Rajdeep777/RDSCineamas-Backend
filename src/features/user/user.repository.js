import mongoose from "mongoose";
import userSchema from "./user.schema.js";
import ApplicationError from "../../../error-handler/applicationError.js";
// Creating model from schema
const UserModel = mongoose.model("User", userSchema);
class UserRepository {
  async signUp(user) {
    try {
      // Create instance of model
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        throw new ApplicationError("Somthing went wrong with database", 500);
      }
    }
  }
  async getAll() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async resetPassword(userID, hashedPassword) {
    try {
      let user = await UserModel.findById(userID);
      if (user) {
        user.password = hashedPassword;
        user.save();
      } else {
        throw new Error("No such user found");
      }
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default UserRepository;
