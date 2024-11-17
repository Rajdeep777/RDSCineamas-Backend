import LikeRepository from "./like.repository.js";
class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userID;
      if (type != "Movie" && type != "Category") {
        return res.status(400).send("Invalid type");
      }
      if (type == "Movie") {
        this.likeRepository.likeMovie(userId, id);
      } else {
        this.likeRepository.likeCategory(userId, id);
      }
      return res.status(200).send();
    } catch (error) {
      res.status(400).send("Something went wrong");
    }
  }
  async getLikes(req, res, next) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLikes(type, id);
      return res.status(200).send(likes)
    } catch (error) {
      res.status(400).send("Something went wrong");
    }
  }
}
export default LikeController;
