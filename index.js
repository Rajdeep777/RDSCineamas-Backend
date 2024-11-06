import express from "express";
import movieRouter from "./src/features/movie/movie.routes.js";
const server = express();
const PORT = 8000;
// For all requrests related to movie, redirect to movie routes
server.use("/api/movies", movieRouter);
server.get("/", (req, res) => {
  res.send("Welcome to RDSCinemas !!!");
});
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
});
