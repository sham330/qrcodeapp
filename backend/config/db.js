const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('qrcode_scanner', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL Connected'))
  .catch((err) => console.error('❌ Error:', err));

module.exports = sequelize;
