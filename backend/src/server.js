import cors from "cors";
import express from "express";
import bookRoutes from "./routes/books.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

const corsOptions = { 
  origin: process.env.NODE_ENV === 'production' ? "https://chapterrewind.onrender.com" : "http://localhost:5173", 
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on localhost: ${PORT}`);
  connectDB();
});


