import express from "express";
import DownloaderController from "./downloader.controller.js";
const downloaderRouter = express.Router();
const downloadController = new DownloaderController();
downloaderRouter.post("/", (req, res, next) => {
  downloadController.placeMovie(req, res, next);
});
export default downloaderRouter;
