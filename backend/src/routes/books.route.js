import express from "express";
import {
  homePage,
  searchBookYT,
  searchOpenAi,
  searchPage,
  ourStory,
  addBookToLibrary,
  getLibrary,
} from "../controllers/books.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", homePage);
router.get("/searchPage", searchPage);
router.get("/ourStory", ourStory);
router.post("/mylibrary", protectRoute, addBookToLibrary )
router.get("/mylibrary",protectRoute, getLibrary)
router.post("/openai-summary", searchOpenAi);
router.post("/youtube-recaps", searchBookYT);

export default router;
