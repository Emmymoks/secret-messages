const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const msgRoutes = require("./routes/messages");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Allowed origins for CORS
const allowedOrigins = [
  process.env.CLIENT_URL,                       // from .env
  "http://localhost:5173",                      // local dev
  "https://secret-messages-xi.vercel.app"       // deployed frontend
].filter(Boolean);

console.log("🔐 Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Health check routes
app.get("/", (req, res) => {
  res.send("✅ Secret Messages API is running!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);

// Error handler (global)
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`🌍 Client URL allowed: ${process.env.CLIENT_URL || "None set"}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
