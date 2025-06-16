import express from "express";
import {
  homePage,
  searchBookYT,
  searchOpenAi,
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", homePage);

router.post("/openai-summary", searchOpenAi);
router.post("/youtube-recaps", searchBookYT);

export default router;
