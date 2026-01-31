const express = require('express');

// Middleware imports
// const { auth, requiresAuth } = require('express-openid-connect');

// const auth0Config = require('./config/auth0');

// const noteRouter = require('./routes/noteRoutes');
// const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth0 middleware (required for requiresAuth())
// app.use(auth(auth0Config));

// API Routes - all protected
app.use('/api/v1/notes', noteRouter);
// app.use('/api/v1/users', requiresAuth(), userRouter);

// Health check endpoint (public)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: 'Note API backend', message: 'Note API backend is running!' });
});

module.exports = app;
