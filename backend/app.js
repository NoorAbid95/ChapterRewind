// require("dotenv").config();
// const express = require("express");
// const app = express();
// const port = 3000;
// const path = require("path");
// const axios = require("axios");
// const ejsmate = require("ejs-mate");
// // Use this key in your application by passing it with the key=API_KEY parameter.
// const yt_API_key = process.env.YT_API_KEY;

// //Express app configuration
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.engine("ejs", ejsmate);

// //Middleware - this will parse url-encoded data from the form
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "src")));

// //Home page route
// app.get("/", (req, res) => {
//   res.render("home", { title: null, author: null, videos: [] });
// });

// //Serving the form as a get request
// app.get("/new", (req, res) => {
//   res.render("new");
// });

// //POST request from the search form
// app.post("/videos", async (req, res) => {
//   const { title, author } = req.body;
//   const searchQuery = `${title} book recap`;

//   const options = {
//     method: "GET",
//     url: "https://www.googleapis.com/youtube/v3/search",
//     params: {
//       part: "snippet",
//       q: searchQuery,
//       key: yt_API_key,
//     },
//   };
//   try {
//     const response = await axios.request(options);
//     const videos = response.data.items;
//     res.render("videos", { title, author, videos });
//   } catch (err) {
//     console.log(err);
//     res.render("videos", { title, author, videos: [] });
//   }
// });

// app.listen(port, () => {
//   console.log(`Listening on localhost:${port}`);
// });
