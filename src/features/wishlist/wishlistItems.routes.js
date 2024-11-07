import express from "express";
import WishlistItemsController from "./wishlistItems.controller.js";
const wishlistRouter = express.Router();
const wishlistController = new WishlistItemsController();
wishlistRouter.post("/", wishlistController.add);
export default wishlistRouter;
