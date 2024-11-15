import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ["admin", "user"] },
});
export default userSchema;
