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
    const userId = req.user._id;
    const coverResponse = await axios.get(
      "https://bookcover.longitood.com/bookcover",
      {
        params: { book_title: title, author_name: author },
      }
    );
    const coverUrl = coverResponse.data.url;

    // Add book to user library
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          library: { title, author, coverUrl, summary, notes: "" },
        },
      },
      { new: true }
    );

    sendSuccess(res, updatedUser.library, "Book added to library", 201);
  } catch (error) {
    console.error("Error adding book to library", error);
    sendError(res);
  }
};

export const getLibrary = async (req, res) =>{
  try {
    const user = await User.findById(req.user.id)
    if(!user){
      return sendError(res, "User not found", 404)
    }
    sendSuccess(res, user.library, 200)
  } catch (error) {
    console.log("Error in fetching library:", error.message);
    sendError(res)
  }
}

export default {
  homePage,
  searchBookYT,
  searchOpenAi,
  searchPage,
  ourStory,
  addBookToLibrary,
  getLibrary
};
