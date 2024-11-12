import express from "express";
import WishlistItemsController from "./wishlistItems.controller.js";
const wishlistRouter = express.Router();
const wishlistController = new WishlistItemsController();
wishlistRouter.post("/", (req, res, next) => {
  wishlistController.add(req, res, next);
});
wishlistRouter.get("/", (req, res, next) => {
  wishlistController.get(req, res, next);
});
wishlistRouter.delete("/:id", (req, res, next) => {
  wishlistController.delete(req, res, next);
});
export default wishlistRouter;
