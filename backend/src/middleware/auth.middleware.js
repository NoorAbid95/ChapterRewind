import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { sendError } from "../utils/sendResponse.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      sendError(res, "Unauthorised - No Token Provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return sendError(res, "Unauthorised - Invalid Token", 401);
    }

    const user = await User.findById(decoded.user._id).select("-password");
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in the protectRoute middleware", error);
    sendError(res);
  }
};
