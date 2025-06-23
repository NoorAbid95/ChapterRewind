import express from "express";
import {
  homePage,
  searchBookYT,
  searchOpenAi,
  searchPage,
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", homePage);
router.get("/searchPage", searchPage);

router.post("/openai-summary", searchOpenAi);
router.post("/youtube-recaps", searchBookYT);

export default router;
