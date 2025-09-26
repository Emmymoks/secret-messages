require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();

// -------------------- Middleware --------------------
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // basic security headers

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server/curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("❌ Blocked CORS request from:", origin);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

// Rate limiting (protects from abuse on public routes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300, // limit each IP
  message: { message: "Too many requests, try again later." },
});
app.use("/api/", apiLimiter);

// -------------------- Routes --------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Secret Messages API running 🚀" });
});

// -------------------- Database & Server --------------------
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGODB_URI in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// -------------------- Error Handling --------------------
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
