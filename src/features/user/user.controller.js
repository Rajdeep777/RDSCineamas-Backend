import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAllUsers(req, res) {
    try {
      const users = await this.userRepository.getAll();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
  async signUp(req, res, next) {
    const { name, email, password, type } = req.body;
    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!passwordPattern.test(password)) {
      return res
        .status(400)
        .send("Password must be 8-12 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character");
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
  async signIn(req, res) {
    try {
      // 1. Find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 2. Create token
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          // 3. Send token
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (error) {
      return res.status(500).send("Somthing went wrong");
    }
  }
  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const userID = req.userID;
    try {
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is updated");
    } catch (error) {
      console.log("Passing error to middleware");
      next(error);
    }
  }
}
export default UserController;
