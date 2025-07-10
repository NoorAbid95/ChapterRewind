import express from "express";
import {
  homePage,
  searchBookYT,
  searchOpenAi,
  searchPage,
  ourStory,
  addBookToLibrary,
  getLibrary,
  getNote,
  updateNote,
  createNote,
  deleteNote,
  deleteBookFromLibrary,
} from "../controllers/books.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", homePage);
router.get("/searchPage", searchPage);
router.get("/ourStory", ourStory);

router.get("/mylibrary", protectRoute, getLibrary);
router.post("/mylibrary", protectRoute, addBookToLibrary);
router.delete("/mylibrary/:bookId", protectRoute, deleteBookFromLibrary);



router.get("/mylibrary/:bookId/notes", protectRoute, getNote);
router.post("/mylibrary/:bookId/notes", protectRoute, createNote);
router.patch("/mylibrary/:bookId/notes", protectRoute, updateNote);
router.delete("/mylibrary/:bookId/notes", protectRoute, deleteNote);

router.post("/openai-summary", searchOpenAi);
router.post("/youtube-recaps", searchBookYT);

export default router;
