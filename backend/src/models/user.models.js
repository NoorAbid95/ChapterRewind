import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverUrl: { type: String },
  summary: { type: String },
  notes: { type: String, default: "" },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
    },
    library: [bookSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
