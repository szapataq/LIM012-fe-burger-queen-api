// exports.port = process.argv[2] || process.env.PORT || 8080;
// exports.dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test';
// exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
// exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
// exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

require('dotenv').config();

const config = {
  port: process.env.PORT || 8080,
  dbUrl: process.env.DB_URL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
};

module.exports = config;
