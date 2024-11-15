import dotenv from 'dotenv'
import express, { application } from "express";
import swagger, { serve } from "swagger-ui-express";
import cors from 'cors'
import movieRouter from "./src/features/movie/movie.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import wishlistRouter from "./src/features/wishlist/wishlistItems.routes.js";
import apiDocs from "./swagger.json" with { type: "json" };
import ApplicationError from "./error-handler/applicationError.js";
import downloaderRouter from './src/features/downloader/downloader.routes.js';
import connectUsingMongoose from './config/mongooseConfig.js';
const server = express();
const PORT = 8000;
dotenv.config()
// CORSE policy configuration using CORS library
const corsOptions = {
  origin: 'http://localhost:5500'
}
server.use(cors(corsOptions))
server.use(express.json());
// For all requrests related to movie, redirect to movie routes
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use('/api/downloads', jwtAuth, downloaderRouter)
server.use("/api/movies", jwtAuth, movieRouter);
server.use("/api/wishlistItems", jwtAuth, wishlistRouter);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send("Welcome to RDSCinemas !!!");
});
server.get("/client", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});
// Middleware to handle 404 requests
server.use((req, res) => {
  res.send(`API not found, Please check our documentation for more information at <a href="http://localhost:8000/api-docs">Movie API</a>`);
})
// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message)
  }
  //server errors
  res.status(500).send('Somthing went wrong, please try later')
})
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
  connectUsingMongoose()
});
