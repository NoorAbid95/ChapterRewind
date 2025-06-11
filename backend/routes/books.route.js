import express from "express";
import { homePage, searchBook } from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", homePage);

router.post("/", searchBook);

export default router;
