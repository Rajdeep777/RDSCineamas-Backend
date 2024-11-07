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
}
const wishlistItems = [new WishlistItemsModel(1, 2, 1, 1)];
export default WishlistItemsModel;
