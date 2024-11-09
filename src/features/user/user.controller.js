import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import ApplicationError from "../../../error-handler/applicationError.js";
class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = await UserModel.signUp(name, email, password, type);
      res.status(201).send(user);
    } catch (error) {
      throw new ApplicationError("Somthing went wrong", 500);
    }
  }
  signIn(req, res) {
    const result = UserModel.signIn(req.body.email, req.body.password);
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
  }
}
export default UserController;
