const Client = require("../../model/sequelize/Client");
const Car = require("../../model/sequelize/Car");
const Reservation = require("../../model/sequelize/Reservation");

exports.getClients = () => {
    return Client.findAll();
};

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId,{
        include: [{
            model: Reservation,
            as: 'reservations',
            include: [{
                model: Car,
                as: 'car'
            }]
        }]
    });
};

exports.createClient = (newClientData) => {
    console.log(JSON.stringify(newClientData));
    return Client.create({
        firstName: newClientData.firstName,
        lastName: newClientData.lastName,
        pesel: newClientData.pesel,
        email: newClientData.email,
        phoneNumber: newClientData.phoneNumber,
        companyName: newClientData.companyName,
        nip: newClientData.nip
    });
};

exports.updateClient = (clientId, clientData) => {
    return Client.update(clientData, {where: {_id: clientId}});
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: {_id: clientId}
    });
};