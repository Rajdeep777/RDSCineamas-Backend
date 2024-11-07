import express from "express";
import movieRouter from "./src/features/movie/movie.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import wishlistRouter from "./src/features/wishlist/wishlistItems.routes.js";
const server = express();
const PORT = 8000;
server.use(express.json());
// For all requrests related to movie, redirect to movie routes
server.use("/api/movies", jwtAuth, movieRouter);
server.use("/api/wishlistItems", jwtAuth, wishlistRouter);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send("Welcome to RDSCinemas !!!");
});
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
});
