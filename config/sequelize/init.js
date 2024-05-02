const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const Car = require('../../model/sequelize/Car');
const Reservation = require('../../model/sequelize/Reservation');

module.exports = () => {
    Client.hasMany(Reservation, {as: 'reservations', foreignKey: {name: 'client_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Reservation.belongsTo(Client, {as: 'client', foreignKey: {name: 'client_id', allowNull: false}});
    Car.hasMany(Reservation, {as: 'reservations', foreignKey: {name: 'car_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Reservation.belongsTo(Car, {as: 'car', foreignKey: {name: 'car_id', allowNull: false}});

    let allClients, allCars;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Client.findAll();
        })
        .then(clients => {
            if(!clients || clients.length == 0){
                return Client.bulkCreate([
                    {firstName: 'Adam', lastName: 'Kowalski', pesel: '02394821333', email: 'aakowalski@mail.com', phoneNumber: '512-456-099',},
                    {firstName: 'Ania', lastName: 'Zielona', pesel: '01928302198', email: 'zielona.ania@mail.com', phoneNumber: '699-233-011', companyName: 'Coca-cola', nip: '1234567891'}
                ])
                .then(() => {
                    return Client.findAll();
                });
            } else{
                return clients;
            }
        })
        .then(clients => {
            allClients = clients;
            return Car.findAll();
        })
        .then(cars => {
            if(!cars || cars.length == 0){
                return Car.bulkCreate([
                    {brandName: 'Ford', model: 'Focus', registration: 'WF-112222', insurance: '1', inspection: '1'},
                    {brandName: 'Toyota', model: 'Yaris', registration: 'WW-99981', insurance: '1', inspection: '1', description: 'Nowy, automatyczna skrzynia biegów, full wyposażenie'}
                ])
                .then(() => {
                    return Car.findAll();
                });
            } else{
                return cars;
            }
        })
        .then(cars => {
            allCars = cars;
            return Reservation.findAll();
        })
        .then(reservations => {
            if(!reservations || reservations.length == 0){
                return Reservation.bulkCreate([
                    {client_id: allClients[0]._id, car_id: allCars[0]._id, dateFrom: '2022-12-21', dateTo: '2023-05-12'},
                    {client_id: allClients[1]._id, car_id: allCars[1]._id, dateFrom: '2022-12-21', dateTo: '2023-01-12'}
                ]);
            } else{
                return reservations;
            }
        });
};