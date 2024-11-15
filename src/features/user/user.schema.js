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
    validate: {
      validator: function (value) {
        return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
      },
      message:
        "Password should be at least 8-12 character and have a special character",
    },
  },
  type: { type: String, enum: ["admin", "user"] },
});
export default userSchema;
