import axios from "axios";
import { sendSuccess, sendError } from "../utils/sendResponse.js";
import openAI from "openai";
import dotenv from "dotenv";
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
  const searchQuery = `${title} book recap`;
  const yt_API_key = process.env.YT_API_KEY;
  const options = {
    method: "GET",
    url: "https://www.googleapis.com/youtube/v3/search",
    params: {
      part: "snippet",
      q: searchQuery,
      key: yt_API_key,
    },
  };
  try {
    const response = await axios.request(options);
    const videos = response.data.items;
    sendSuccess(res, videos, "Videos fetched", 201);
  } catch (error) {
    console.log("Error in loading videos", error.message);
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

export default {
  homePage,
  searchBookYT,
  searchOpenAi,
  searchPage,
  ourStory,
};
