const express = require('express');

// Middleware imports
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { auth, requiresAuth } = require('express-openid-connect');

const auth0Config = require('./config/auth0');
const noteRouter = require('./routes/noteRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:19006', // Expo dev server
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rate limiting (100 requests per 15min per IP)
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100});
app.use('/api', limiter);

// Auth0 middleware (required for requiresAuth())
app.use(auth(auth0Config));

// API Routes - all protected
app.use('/api/v1/notes', requiresAuth(), noteRouter);

// Health check endpoint (public)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Note API backend is running!'
  });
});

module.exports = app;
