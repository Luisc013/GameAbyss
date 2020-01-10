const Sequelize = require('sequelize');
secretpw = process.env.SECRET_PW
// Option 1: Passing parameters separately
module.exports = new Sequelize('indieca', 'Lixus', secretpw, {
  host: 'localhost',
  dialect:'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});