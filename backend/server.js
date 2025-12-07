// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration - Allow frontend on localhost:5500
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Simple test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Import auth routes AFTER app is initialized
let authRoutes;
try {
  authRoutes = require('./routes/auth');
  console.log('✅ Auth routes loaded, type:', typeof authRoutes);
  console.log('Auth routes:', authRoutes);
} catch (err) {
  console.error('❌ Error loading auth routes:', err.message);
  console.error(err);
  process.exit(1);
}

// Use auth routes
if (authRoutes && typeof authRoutes === 'function') {
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes mounted');
} else {
  console.error('❌ authRoutes is not a function!', authRoutes);
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});
