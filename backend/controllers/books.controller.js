import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import openAI from "openai";

//Home page route
export const homePage = (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Home Page Loaded" });
  } catch (error) {
    console.log("Error in loading home page", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    res.status(201).json({ success: true, data: videos });
  } catch (error) {
    console.log("Error in loading videos", error.message);
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
    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Error from OpenAI:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch book summary from OpenAI",
      error: error.message,
    });
  }
};

export const searchPage = (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Search Page Loaded" });
  } catch (error) {
    console.log("Error in loading search page", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
