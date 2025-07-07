import cors from "cors";
import express from "express";
import bookRoutes from "./routes/books.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./conifg/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on localhost: ${PORT}`);
  connectDB();
});
