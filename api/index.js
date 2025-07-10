import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
// console.log(process.env.M)
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

async function startServer() {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if MongoDB connection fails
  }
}

startServer();
