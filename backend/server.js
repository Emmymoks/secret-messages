require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed origins for CORS (frontend)
const allowedOrigins = [
  'http://localhost:5173', // dev
  'http://127.0.0.1:5173', // alternative localhost
  process.env.FRONTEND_URL, // single frontend (optional)
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : []) // multiple frontends
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (server-to-server, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS not allowed for: ' + origin), false);
    },
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Secret Messages API running 🚀' });
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI;

// Ensure Mongo URI is set
if (!MONGO_URI) {
  console.error('❌ Missing MONGODB_URI in environment variables');
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Handle unexpected errors
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
