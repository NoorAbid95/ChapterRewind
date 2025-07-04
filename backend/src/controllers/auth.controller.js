import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { sendSuccess, sendError } from "../utils/sendResponse.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return sendError(res, "All fields required", 400);
    }
    if (password.length < 6) {
      return sendError(res, "Password must be at least 6 characters long", 400);
    }

    const user = await User.findOne({ email });
    if (user) return sendError(res, "Account email already exists", 400);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      sendSuccess(
        res,
        { _id: newUser._id, fullName: newUser.fullName, email: newUser.email },
        "User registered successfully",
        201
      );
    } else {
      sendError(res, "Invalid User Data", 400);
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    sendError(res);
  }
};
