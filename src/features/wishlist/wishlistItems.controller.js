import WishlistItemsModel from "./wishlistItems.model.js";
class WishlistItemsController {
  add(req, res) {
    const { movieID, numberOfMovies } = req.query;
    const userID = req.userID;
    WishlistItemsModel.add(movieID, userID, numberOfMovies);
    return res.status(201).send("Wishlist is updated");
  }
  get(req, res) {
    const userID = req.userID;
    const items = WishlistItemsModel.get(userID);
    return res.status(200).send(items);
  }
  delete(req, res) {
    const userID = req.userID
    const wishlistItemID = req.params.id
    const error = WishlistItemsModel.delete(wishlistItemID, userID)
    if (error) {
      return res.status(404).send(error)
    }
    return res.status(200).send('Wishlist Item is removed')
  }
}
export default WishlistItemsController;
