import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

// configing the dotenv file
dotenv.config();

const app = express();

// creating the middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connection to database
connectDB();

//ROUTES
app.use("/api/user", userRoutes);

app.use("/", (req, res) => {
  res.send("HI");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
