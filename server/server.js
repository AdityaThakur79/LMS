import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConfig.js";
import cors from "cors";

// configing the dotenv file
dotenv.config();

const app = express();

// creating the middleware
app.use(cors());

// Connection to database
connectDB();

app.use("/", (req, res) => {
  res.send("HI");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
