require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');

const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const auth0Config = require('./config/auth0');
const swaggerOptions = require('./config/swagger');

const noteRoutes = require('./routes/note.route');
const profileRoutes = require('./routes/profile.route');

const app = express();

// Essential middleware (CORS + JSON)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth0 middleware (required for requiresAuth())
app.use(auth(auth0Config));

// API Routes - all protected
app.use('/api/v1/notes', requiresAuth(), noteRoutes);
app.use('/api/v1/profile', requiresAuth(), profileRoutes);

// Swagger API docs (protected - requires login)
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint (public)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: 'Note API backend', message: 'Note API backend is running!' });
});

// Database + Server start
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Note API backend running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
