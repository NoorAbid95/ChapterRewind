import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { sendError } from "../utils/sendResponse.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return sendError(res, "Unauthorized - No Token Provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return sendError(res, "Unauthorized - Invalid Token", 401);
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in the protectRoute middleware", error);
    return sendError(res);
  }
};
