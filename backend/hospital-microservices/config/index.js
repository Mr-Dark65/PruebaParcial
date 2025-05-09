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
    const connection = await mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      port: dbConfig.port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    connectionCache[ciudad] = connection;
  }

  return connectionCache[ciudad];
}

module.exports = { getConnectionByCity };
