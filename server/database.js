const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movies-db', 'user', 'pass', {
  dialect: 'sqlite',
  host: 'movies.sqlite',
});

module.exports = sequelize;
