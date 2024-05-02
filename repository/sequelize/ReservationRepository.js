const Sequelize = require('sequelize');

const Client = require("../../model/sequelize/Client");
const Car = require("../../model/sequelize/Car");
const Reservation = require("../../model/sequelize/Reservation");

exports.getReservations = () => {
    return Reservation.findAll({include: [
        {
            model: Client,
            as: 'client'
        },
        {
            model: Car,
            as: 'car'
        }]
    });
};

exports.getReservationById = (reservationId) => {
    return Reservation.findByPk(reservationId,{include: [
        {
            model: Client,
            as: 'client'
        },
        {
            model: Car,
            as: 'car'
        }]
    });
};

exports.createReservation = (data) => {
    console.log(JSON.stringify(data));
    return Reservation.create({
        client_id: data.client_id,
        car_id: data.car_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
    });
};

exports.updateReservation = (reservationId, data) => {
    return Reservation.update(data, {where: {_id: reservationId}});
};

exports.deleteReservation = (reservationId) => {
    return Reservation.destroy({
        where: {_id: reservationId}
    });
};

exports.deleteManyReservations = (reservationIds) => {
    return Reservation.find({_id: {[Sequelize.Op.in]: reservationIds}});
}