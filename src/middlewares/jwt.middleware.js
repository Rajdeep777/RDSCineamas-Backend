import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  // 1. Create jwt token
  const token = req.headers["authorization"];
  // 2. if no token then return error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  // 3.Check if token is valid
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = payload.userID;
    console.log(payload);
    //4. return error
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
  next();
};
export default jwtAuth;
