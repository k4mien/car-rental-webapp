const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Client', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierac od 2 do 60 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierac od 2 do 60 znaków"
            },
        }
    },
    pesel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [11],
                msg: "Pole powinno zawierać poprawny numer pesel (11 cyfr)"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email zgodny ze wzorcem"
            },
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            is: {
                args: /^\d{3}\-\d{3}\-\d{3}$/,
                msg: "Zły format, prawidłowy format to: 111-222-333"
            }
        }
        
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    nip: {
        type: Sequelize.STRING,
        allowNull: true,
    }

});

module.exports = Client;