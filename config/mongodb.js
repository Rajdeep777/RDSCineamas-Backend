import { MongoClient } from "mongodb";
let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB is connected !!!");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDB = () => {
  return client.db();
};
const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "wishlistItemId" });
  if (!existingCounter) {
    await db
      .collection("counters")
      .insertOne({ _id: "wishlistItemId", value: 0 });
  }
};
const createIndexes = async (db) => {
  try {
    await db.collection("movies").createIndex({ imdb: 1 });
    await db.collection("movies").createIndex({ name: 1, year: -1 });
    await db.collection("movies").createIndex({ desc: "text" });
  } catch (error) {
    console.log(error);
  }
  console.log("Indexes are created");
};
