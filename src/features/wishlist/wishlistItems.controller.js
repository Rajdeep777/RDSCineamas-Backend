import WishlistItemsModel from "./wishlistItems.model.js";
class WishlistItemsController {
  add(req, res) {
    const { movieID, numberOfMovies } = req.query;
    const userID = req.userID;
    WishlistItemsModel.add(movieID, userID, numberOfMovies);
    return res.status(201).send("Wishlist is updated");
  }
}
export default WishlistItemsController;
