const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Car', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    brandName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierac od 2 do 20 znaków"
            },
        }
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierac od 2 do 20 znaków"
            },
        }
    },
    registration: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            is: {
                args: /^([A-Z]{2}-*?[A-Z0-9]{5})|([A-Z]{3}-*?[A-Z0-9]{4})$/,
                msg: "Rejestracja powinna mieć format WF-123456 albo WFF-12345"
            }
        }
    },
    insurance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    inspection: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    description: {
        type: Sequelize.STRING(1000),
        allowNull: true
    }
    
});

module.exports = Car;