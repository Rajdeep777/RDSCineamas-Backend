import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../../config/mongodb.js";
import ApplicationError from "../../../error-handler/applicationError.js";
import DownloaderModel from "./downloader.model.js";
class DownloaderRepository {
  constructor() {
    this.collection = "downloadings";
  }
  async placeMovie(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();
      session.startTransaction();
      // 1. Get the wishlistitems and calculate total amount
      const items = await this.getTotalSize(userId, session);
      const finalTotalSize = items.reduce(
        (acc, item) => acc + item.totalSize,
        0
      );
      console.log(finalTotalSize);
      // 2. Create an downloader record
      const newDownload = new DownloaderModel(
        new ObjectId(userId),
        finalTotalSize,
        new Date()
      );
      await db.collection(this.collection).insertOne(newDownload, { session });
      // 3. Clear the downloader items
      await db.collection("wishlist").deleteMany(
        {
          userID: new ObjectId(userId),
        },
        { session }
      );
      session.commitTransaction();
      session.endSession();
      return;
    } catch (error) {
      session.abortTransaction();
      session.endSession();
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
  async getTotalSize(userId, session) {
    try {
      const db = getDB();
      const items = await db
        .collection("wishlist")
        .aggregate(
          [
            // 1. Get the wishlist items for the user
            { $match: { userID: new ObjectId(userId) } },
            // 2. Get the movies from movies collection
            {
              $lookup: {
                from: "movies",
                localField: "movieID",
                foreignField: "_id",
                as: "movieInfo",
              },
            },
            // 3. Unwind the movieInfo
            {
              $unwind: "$movieInfo",
            },
            // 4. Calculate total Size for each wishlist item
            {
              $addFields: {
                totalSize: {
                  $round: [
                    { $multiply: ["$movieInfo.fullhdSize", "$numberOfMovies"] },
                    1,
                  ],
                },
              },
            },
          ],
          { session }
        )
        .toArray();
      return items;
    } catch (error) {
      throw new ApplicationError("Somthing went wrong with database", 500);
    }
  }
}
export default DownloaderRepository;
