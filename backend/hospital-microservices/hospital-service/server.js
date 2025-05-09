const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { getConnectionByCity, closeAllConnections } = require('./config/index');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para extraer la ciudad del header
app.use((req, res, next) => {
  req.city = req.headers['x-city'] || process.env.DEFAULT_CITY || 'quito';
  next();
});

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Service API',
      version: '1.0.0',
      description: 'API documentation for the Hospital Service',
      contact: {
        name: 'Support',
        url: 'http://www.hospitalservice.com',
        email: 'support@hospitalservice.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'Hospital Service is running',
    currentCity: req.city
  });
});

// Rutas
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manejo de cierre limpio
process.on('SIGINT', async () => {
  await closeAllConnections();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeAllConnections();
  process.exit(0);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Hospital Service running on port ${PORT}`);
  console.log(`Default city: ${process.env.DEFAULT_CITY || 'quito'}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});