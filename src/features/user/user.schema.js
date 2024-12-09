import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name can't be greater than 25 character"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\../, "Please enter a valid email"],
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  type: { type: String, enum: ["admin", "user"] },
});
export default userSchema;
