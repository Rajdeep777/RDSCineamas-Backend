import mongoose from "mongoose";
import dotenv from "dotenv";
import categorySchema from "../src/features/movie/category.schema.js";
dotenv.config();
const url = process.env.DB_URL;
const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    addCategories();
    console.log("MongoDB connected using mongoose !!!");
  } catch (error) {
    console.log("Error while connecting to DB");
  }
};
async function addCategories() {
  const CategoryModel = mongoose.model("Category", categorySchema);
  const categories = await CategoryModel.find();
  if (!categories || categories.length == 0) {
    await CategoryModel.insertMany([
      { name: "Sci-fi" },
      { name: "Adventure" },
      { name: "Thriller" },
    ]);
  }
  console.log('Categories are added');
  
}
export default connectUsingMongoose;
