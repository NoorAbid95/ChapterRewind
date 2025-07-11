import express from "express";

import {
  signup,
  login,
  authCheck,
  logout,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check", protectRoute, authCheck);
router.post("/logout", logout);

export default router;
