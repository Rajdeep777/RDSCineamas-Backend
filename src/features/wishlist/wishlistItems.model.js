class WishlistItemsModel {
  constructor(userID, movieID, numberOfMovies, id) {
    this.userID = userID;
    this.movieID = movieID;
    this.numberOfMovies = numberOfMovies;
    this.id = id;
  }
  static add(userID, movieID, numberOfMovies) {
    const wishlistItem = new WishlistItemsModel(
      userID,
      movieID,
      numberOfMovies
    );
    wishlistItem.id = wishlistItems.length + 1;
    wishlistItems.push(wishlistItem);
    return wishlistItem;
  }
  static get(userID) {
    return wishlistItems.filter((i) => i.userID == userID);
  }
}
const wishlistItems = [
  new WishlistItemsModel(2, 1, 1, 1),
  new WishlistItemsModel(1, 1, 2, 2),
];
export default WishlistItemsModel;
