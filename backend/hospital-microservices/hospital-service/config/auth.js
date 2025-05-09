module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'clave_secreta_fuerte',
    jwtExpiresIn: '24h',
    saltRounds: 10
  };