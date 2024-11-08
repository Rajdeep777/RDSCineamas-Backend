import express from "express";
import WishlistItemsController from "./wishlistItems.controller.js";
const wishlistRouter = express.Router();
const wishlistController = new WishlistItemsController();
wishlistRouter.post("/", wishlistController.add);
wishlistRouter.get("/", wishlistController.get);
wishlistRouter.delete('/:id', wishlistController.delete)
export default wishlistRouter;
