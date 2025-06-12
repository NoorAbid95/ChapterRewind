import express from "express";
import {
  homePage,
  searchBookYT,
  searchOpenAi,
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", homePage);

router.post("/", searchOpenAi);

export default router;
