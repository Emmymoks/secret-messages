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
  'http://127.0.0.1:5173', // alternative dev
  process.env.FRONTEND_URL, // single frontend
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : []) // multiple
].filter(Boolean);

console.log("✅ Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
        // Allow server-to-server or curl/postman (no origin)
        if (!origin) return callback(null, true);

        // If operator has explicitly allowed all origins via env, accept everything.
        if (process.env.ALLOW_ALL_ORIGINS === 'true' || allowedOrigins.includes('*')) {
          return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        console.warn("🚫 Blocked by CORS:", origin);
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

// Ensure JWT secret is present in production, provide a safe fallback in development
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Missing JWT_SECRET in environment variables (required in production)');
    process.exit(1);
  } else {
    // Generate a temporary secret for local development so dev servers don't crash.
    // This is intentionally permissive for dev; set JWT_SECRET in production.
    const { randomBytes } = require('crypto');
    process.env.JWT_SECRET = randomBytes(48).toString('hex');
    console.warn('⚠️ JWT_SECRET not provided — using a temporary development secret.\nSet JWT_SECRET in your .env or platform config for production deployments.');
  }
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
