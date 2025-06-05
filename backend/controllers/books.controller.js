import dotenv from "dotenv";
dotenv.config();
//import mongoose from "mongoose"
import axios from "axios";

//Home page route
export const homePage = (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Home Page Loaded" });
  } catch (error) {
    console.log("Error in loading home page", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const searchBook = async (req, res) => {
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
