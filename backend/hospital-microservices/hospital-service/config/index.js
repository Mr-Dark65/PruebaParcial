const mysql = require('mysql2/promise');
const config = require('./config');

const connectionCache = {};

async function getConnectionByCity(ciudad) {
  let dbConfig;

  // Quito se conecta a la base central
  if (ciudad.toLowerCase() === 'quito') {
    dbConfig = config.centralDB;
  } else {
    dbConfig = config.hospitalDB[ciudad.toLowerCase()];
  }

  if (!dbConfig) {
    throw new Error(`No hay configuración para la ciudad: ${ciudad}`);
  }

  // Cachea la conexión para no abrir muchas
  if (!connectionCache[ciudad]) {
    try {
      const connection = await mysql.createPool({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        port: dbConfig.port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000, // 10 segundos de timeout
        acquireTimeout: 10000,
        timeout: 10000
      });

      // Verificar la conexión
      await connection.query('SELECT 1');
      console.log(`Conexión exitosa a la base de datos de ${ciudad}`);
      
      connectionCache[ciudad] = connection;
    } catch (error) {
      console.error(`Error al conectar a la base de datos de ${ciudad}:`, error);
      throw new Error(`No se pudo conectar a la base de datos de ${ciudad}: ${error.message}`);
    }
  }

  return connectionCache[ciudad];
}

// Función para cerrar todas las conexiones
async function closeAllConnections() {
  for (const [city, connection] of Object.entries(connectionCache)) {
    try {
      await connection.end();
      console.log(`Conexión cerrada para ${city}`);
    } catch (error) {
      console.error(`Error al cerrar la conexión de ${city}:`, error);
    }
  }
  connectionCache = {};
}

module.exports = { getConnectionByCity, closeAllConnections };
