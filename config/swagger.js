const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note Taking Application API',
      version: '1.0.0',
      description: 'Note Taking Application API secured with Auth0',
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['../routes/*.route.js'],
};

module.exports = swaggerOptions;
