import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import tasksRouter from "./routes/tasks.js";

// Environment variables access setup
configDotenv();

// Server and Database setup
const app = express();
const db = mongoose.connection;

// Environment variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Database connection
mongoose.connect(DATABASE_URL);
db.on("error", (error) => console.log(error));
db.on("connected", () =>
  console.log(chalk.greenBright.bold("💾 MongoDB - Connected to Database"))
);

// Server setup
app.use(express.json());

// Routes setup
app.use("/tasks", tasksRouter);

// Server startup
app.listen(PORT, () => {
  console.log(
    chalk.greenBright.bold("🚀 Vask API - Server Started"),
    chalk.cyan(`on port ${PORT}`),
    chalk.magentaBright(`[${new Date().toLocaleString()}]`)
  );
});
