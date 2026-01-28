const express = require('express');

// Middleware imports
const morgan = require('morgan');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const auth0Config = require('./config/auth0');
const swaggerOptions = require('./config/swagger');

const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development')
{
  // Logging
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth0 middleware (required for requiresAuth())
app.use(auth(auth0Config));

// API Routes - all protected
app.use('/api/v1/notes', requiresAuth(), noteRouter);
app.use('/api/v1/users', requiresAuth(), userRouter);

// Swagger API docs (protected - requires login)
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint (public)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: 'Note API backend', message: 'Note API backend is running!' });
});

module.exports = app;
