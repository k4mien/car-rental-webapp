const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;