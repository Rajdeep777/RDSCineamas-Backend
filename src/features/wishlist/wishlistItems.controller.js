import WishlistItemsRepository from "./wishlistItems.repository.js";
class WishlistItemsController {
  constructor() {
    this.wishlistItemsRepository = new WishlistItemsRepository();
  }
  async add(req, res) {
    try {
      const { movieID, numberOfMovies } = req.body;
      const userID = req.userID;
      await this.wishlistItemsRepository.add(movieID, userID, numberOfMovies);
      return res.status(201).send("Wishlist is updated");
    } catch (error) {
      return res.status(400).send("Somthing went wrong");
    }
  }
  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.wishlistItemsRepository.get(userID);
      return res.status(200).send(items);
    } catch (error) {
      return res.status(400).send("Somthing went wrong");
    }
  }
  async delete(req, res) {
    try {
      const userID = req.userID;
      const wishlistItemID = req.params.id;
      const isDeleted = await this.wishlistItemsRepository.delete(
        userID,
        wishlistItemID
      );
      if (!isDeleted) {
        return res.status(404).send("Item not found");
      }
      return res.status(200).send("Wishlist Item is removed");
    } catch (error) {
      return res.status(400).send("Somthing went wrong");
    }
  }
}
export default WishlistItemsController;
