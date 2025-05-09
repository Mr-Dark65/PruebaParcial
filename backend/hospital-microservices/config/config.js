require('dotenv').config();

module.exports = {
  // Configuración de la base de datos principal (Quito)
  centralDB: {
    host: process.env.DB_HOST || 'quito-db',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'adminpass',
    database: process.env.DB_NAME || 'hospital_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },

  // Configuración para bases de datos locales de hospitales
  hospitalDB: {
    guayaquil: {
      host: process.env.GUAYAQUIL_DB_HOST || 'guayaquil-db',
      port: parseInt(process.env.GUAYAQUIL_DB_PORT) || 3306,
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'adminpass',
      database: process.env.DB_NAME || 'hospital_db'
    },
    cuenca: {
      host: process.env.CUENCA_DB_HOST || 'cuenca-db',
      port: parseInt(process.env.CUENCA_DB_PORT) || 3306,
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'adminpass',
      database: process.env.DB_NAME || 'hospital_db'
    },
    latacunga: {
      host: process.env.LATACUNGA_DB_HOST || 'latacunga-db',
      port: parseInt(process.env.LATACUNGA_DB_PORT) || 3306,
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'adminpass',
      database: process.env.DB_NAME || 'hospital_db'
    }
  },

  // Configuración del servidor
  server: {
    port: parseInt(process.env.SERVER_PORT) || 3000,
    env: process.env.NODE_ENV || 'development'
  },

  // Autenticación JWT
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret_key_hospital',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Configuración de replicación
  replication: {
    retryDelay: 5000, // 5 segundos entre reintentos
    maxRetries: 3
  }
};
