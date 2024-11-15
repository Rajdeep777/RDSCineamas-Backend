import DownloaderRepository from "./downloader.repository.js";
class DownloaderController {
  constructor() {
    this.downloaderRepository = new DownloaderRepository();
  }
  async placeMovie(req, res, next) {
    try {
      const userId = req.userID;
      await this.downloaderRepository.placeMovie(userId);
      res.status(201).send("Place movie for download");
    } catch (error) {
      res.status(400).send("Somthing went wrong");
    }
  }
}
export default DownloaderController;
