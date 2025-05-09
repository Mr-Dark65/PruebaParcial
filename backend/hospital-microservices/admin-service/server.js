require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { createConnection } = require('./config/database');
const auth = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Management API - Admin Service',
      version: '1.0.0',
      description: 'API para la gestión administrativa del sistema hospitalario',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'soporte@hospitalapi.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local'
      },
      {
        url: 'https://api.hospital.example.com',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Async init
(async () => {
  try {
    const db = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    const apiRoutes = require('./routes/api')(db);
    app.use('/api', apiRoutes);

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Health check
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'Admin Service is running' });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Admin Service running on port ${PORT}`);
      console.log(`📘 Swagger UI available at http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar la app:', error.message);
    process.exit(1); // Termina el proceso si no hay conexión
  }
})();
