import axios from "axios";
import { sendSuccess, sendError } from "../utils/sendResponse.js";
import openAI from "openai";
import dotenv from "dotenv";
import User from "../models/user.models.js";
dotenv.config();

//Home page route
export const homePage = (req, res) => {
  try {
    sendSuccess(res, {}, "Homepage Loaded Successfully");
  } catch (error) {
    console.log("Error in loading home page", error.message);
    sendError(res);
  }
};

export const searchBookYT = async (req, res) => {
  const { title, author } = req.body;
  const searchQuery = `${title} by ${author} book recap`;
  const yt_API_key = process.env.YT_API_KEY;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: searchQuery,
          key: yt_API_key,
          maxResults: 5,
          type: "video",
        },
      }
    );
    sendSuccess(res, response.data.items, 200);
  } catch (error) {
    console.error("YouTube API error:", error.message);
    sendError(res);
  }
};

export const searchOpenAi = async (req, res) => {
  const { title, author } = req.body;
  const client = new openAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Please provide a synopsis of the book titled "${title}" by ${author}.`,
        },
      ],
      max_tokens: 300,
    });

    const summary = completion.choices[0].message.content;
    sendSuccess(res, { summary }, "Summary retrieved");
  } catch (error) {
    console.error("Error from OpenAI:", error.message);
    sendError(res);
  }
};

export const searchPage = (req, res) => {
  try {
    sendSuccess(res, {}, "Search Page Loaded", 201);
  } catch (error) {
    console.log("Error in loading search page", error.message);
    sendError(res);
  }
};

export const ourStory = (req, res) => {
  try {
    sendSuccess(res, {}, "Our Story Page Loaded", 201);
  } catch (error) {
    console.log("Error in loading search page", error.message);
    sendError(res);
  }
};

export const addBookToLibrary = async (req, res) => {
  const { title, author, summary } = req.body;

  try {
    const query = `${title} ${author}`;
    const googleResponse = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: query,
          maxResults: 1,
          key: process.env.GOOGLE_BOOKS_API,
        },
      }
    );

    const book = googleResponse.data.items?.[0];
    if (!book) {
      return sendError(res, "No book found with that title/author", 404);
    }

    const volumeInfo = book.volumeInfo;
    const correctedTitle = volumeInfo.title;
    const correctedAuthor = volumeInfo.authors?.[0] || "";

    const coverResponse = await axios.get(
      "https://bookcover.longitood.com/bookcover",
      {
        params: {
          book_title: correctedTitle,
          author_name: correctedAuthor,
        },
      }
    );

    const coverUrl = coverResponse.data.url;
    const userId = req.user._id;

    // Save to user library
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          library: {
            title: correctedTitle,
            author: correctedAuthor,
            coverUrl,
            summary,
            notes: "",
          },
        },
      },
      { new: true }
    );

    sendSuccess(res, updatedUser.library, "Book added to library", 201);
  } catch (error) {
    console.error("Error adding book to library", error.message);
    sendError(res);
  }
};

export const deleteBookFromLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found", 404);

    const initialLength = user.library.length;

    user.library = user.library.filter((b) => b._id.toString() !== bookId);

    if (user.library.length === initialLength) {
      return sendError(res, "Book not found in user's library", 404);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Book successfully removed from library",
    });
  } catch (error) {
    console.error("Error deleting book from library:", error);
    return sendError(res, "Server error", 500);
  }
};

export const getLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, "User not found", 404);
    }
    sendSuccess(res, user.library, 200);
  } catch (error) {
    console.log("Error in fetching library:", error.message);
    sendError(res);
  }
};

export const getNote = async (req, res) => {
  try {
    console.log("User id:", req.user._id);
    console.log("Book id:", req.params.bookId);
    const user = await User.findById(req.user._id);
    const book = user.library.id(req.params.bookId);
    if (!book) return sendError(res, "Book not found", 404);
    sendSuccess(res, book.notes || "", 200);
  } catch (error) {
    console.log("Error in getNotes controller", error.message);
    sendError(res);
  }
};

export const createNote = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const book = user.library.id(req.params.bookId);

    if (!book) return sendError(res, "Book not found", 404);

    if (book.notes && book.notes.trim() !== "") {
      return sendError(res, "Book already exists", 409);
    }

    book.notes = req.body.note || "";
    await user.save();
    sendSuccess(res, { note: book.notes }, "Note Created", 201);
  } catch (error) {
    console.log("Error in createNote controller", error.message);
    sendError(res);
  }
};

export const updateNote = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const book = user.library.id(req.params.bookId);

    if (!book) return sendError(res, "Book not found", 404);
    if (!book.notes) return sendError(res, "No book notes to update", 404);
    book.notes = req.body.note || "";
    await user.save();
    sendSuccess(res, "Notes Updated", 200);
  } catch (error) {
    console.log("Error in updateNotes controller", error.message);
    sendError(res);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const book = user.library.id(req.params.bookId);
    if (!book) return sendError(res, "Book not found", 404);
    book.notes = "";
    await user.save();
    sendSuccess(res, "Notes deleted", 200);
  } catch (error) {
    console.log("Error in delete note controller: ", error.message);
    sendError(res);
  }
};

export default {
  homePage,
  searchBookYT,
  searchOpenAi,
  searchPage,
  ourStory,
  addBookToLibrary,
  getLibrary,
  getNote,
  updateNote,
  deleteNote,
};
