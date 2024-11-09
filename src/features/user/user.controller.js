import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = new UserModel(name, email, password, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      return res.status(500).send("Somthing went wrong");
    }
  }
  async signIn(req, res) {
    try {
      const result = await this.userRepository.signIn(
        req.body.email,
        req.body.password
      );
      if (!result) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // 1. Create token
        const token = jwt.sign(
          {
            userID: result.id,
            email: result.email,
          },
          "9MbltR1RpKRLuiqI92awST3TVoqNBzBB",
          {
            expiresIn: "1h",
          }
        );
        // 2. Send token
        return res.status(200).send(token);
      }
    } catch (error) {
      return res.status(500).send("Somthing went wrong");
    }
  }
}
export default UserController;
