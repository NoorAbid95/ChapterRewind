import dotenv from "dotenv";
dotenv.config();

import express from "express";
// import {connectDb} from "./config/db.js"
import bookRoutes from "./routes/books.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server started on localhost: ${PORT}`);
  //connectDb()
});
