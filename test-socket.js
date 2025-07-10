#!/usr/bin/env node

/**
 * Test script to check if the real-time messaging is working
 * Run this after starting both client and server
 */

const io = require("socket.io-client");

// Connect to the local socket server
const socket = io("http://localhost:5000", {
  query: {
    userId: "test-user-123",
  },
});

socket.on("connect", () => {
  console.log("✅ Socket connected successfully");
  console.log("Socket ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error.message);
});

socket.on("getOnlineUsers", (users) => {
  console.log("👥 Online users:", users);
});

socket.on("newMessage", (message) => {
  console.log("📨 New message received:", message);
});

// Keep the script running
console.log("🔄 Testing socket connection...");
console.log("Press Ctrl+C to exit");

process.on("SIGINT", () => {
  console.log("\n👋 Closing socket connection...");
  socket.close();
  process.exit(0);
});
