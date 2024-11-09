import { getDB } from "../../../config/mongodb.js";
import ApplicationError from "../../../error-handler/applicationError.js";
class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }
  static async signUp(name, email, password, type) {
    try {
      // 1. Get the database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection("users");
      const newUser = new UserModel(name, email, password, type);
      // 3. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong", 500);
    }
  }
  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
  static getAll() {
    return users;
  }
}
const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "Admin",
    type: "Admin",
  },
  {
    id: 2,
    name: "User",
    email: "user@gmail.com",
    password: "User",
    type: "User",
  },
];
export default UserModel;
