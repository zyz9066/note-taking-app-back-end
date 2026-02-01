const express = require('express');

// Middleware imports
const noteRouter = require('./routes/noteRoutes');

const app = express();

// Middlewares
app.use(express.json());

// API Routes - all protected
app.use('/api/v1/notes', noteRouter);

// Health check endpoint (public)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Note API backend is running!'
  });
});

module.exports = app;
