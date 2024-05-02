const Client = require("../../model/sequelize/Client");
const Car = require("../../model/sequelize/Car");
const Reservation = require("../../model/sequelize/Reservation");

exports.getCars = () => {
    return Car.findAll();
};

exports.getCarById = (carId) => {
    return Car.findByPk(carId,{
        include: [{
            model: Reservation,
            as: 'reservations',
            include: [{
                model: Client,
                as: 'client'
            }]
        }]
    });
};

exports.createCar = (newCarData) => {
    console.log(JSON.stringify(newCarData));
    return Car.create({
        brandName: newCarData.brandName,
        model: newCarData.model,
        registration: newCarData.registration,
        insurance: newCarData.insurance,
        inspection: newCarData.inspection,
        description: newCarData.description
    });
};

exports.updateCar = (carId, carData) => {
    return Car.update(carData, {where: {_id: carId}});
};

exports.deleteCar = (carId) => {
    return Car.destroy({
        where: {_id: carId}
    });
};