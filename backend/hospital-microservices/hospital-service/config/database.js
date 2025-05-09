const mysql = require('mysql2/promise');

const createConnection = async (config) => {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      port: config.port
    });
    console.log(`Connected to database: ${config.database}`);
    return connection;
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    throw error;
  }
};

module.exports = { createConnection };