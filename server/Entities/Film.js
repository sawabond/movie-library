const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Film extends Model {}

Film.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    imdbRating: {
      type: DataTypes.DOUBLE,
    },
    isSeries: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize, modelName: 'film' }
);

module.exports = Film;
