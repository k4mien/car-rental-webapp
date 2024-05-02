const ClientRepository = require('../repository/sequelize/ClientRepository');
const CarRepository = require('../repository/sequelize/CarRepository');
const ReservationRepository = require('../repository/sequelize/ReservationRepository');
const Client = require('../model/sequelize/Client');

exports.showReservationList = (req, res, next) => {
    ReservationRepository.getReservations()
    .then(reservations => {
        res.render('pages/reservation/list', { 
            reservations: reservations,
            navLocation: 'reservation'
        });
    });
}

exports.showReservationFormNew = (req, res, next) => {
    let allClients, allCars;

    ClientRepository.getClients()
        .then(clients => {
            allClients = clients;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/reservation/add', {
                reservation: {},
                formMode: 'createNew',
                allClients: allClients,
                allCars: allCars,
                pageTitle: 'Nowa rezerwacja',
                btnLabel: 'Dodaj rezerwacje',
                formAction: '/reservation/add',
                navLocation: 'reservation',
                validationErrors: []
        });
    });
}

exports.showReservationFormEdit = (req, res, next) => {
    const reservationId = req.params.reservationId;
    let allClients, allCars, reservationEdit;
    
    ReservationRepository.getReservationById(reservationId)
        .then(reservation => {
            reservationEdit = reservation;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/reservation/edit', {
                formMode: 'edit',
                reservationData: {},
                reservation: reservationEdit,
                allClients: allClients,
                allCars: allCars,
                pageTitle: 'Edytuj rezerwacje',
                btnLabel: 'Edytuj rezerwacje',
                formAction: '/reservation/edit/' + reservationId,
                navLocation: 'reservation',
                validationErrors: []
        });
    });
}

exports.showReservationDetails = (req, res, next) => {
    const reservationId = req.params.reservationId;

    ReservationRepository.getReservationById(reservationId)
        .then(reservation => {
            res.render('pages/reservation/details', {
                reservation: reservation,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły rezerwacji',
                formAction: '',
                navLocation: 'reservation',
                validationErrors: []
            })
        })
}

exports.addReservation = (req, res, next) => {
    const reservation = {...req.body};

    ReservationRepository.createReservation(reservation)
        .then(() => {
            res.redirect('/reservation');
        })
}

exports.updateReservation = (req, res, next) => {
    const reservationId = req.body._id;
    const reservationData = {...req.body};

    ReservationRepository.updateReservation(reservationId, reservationData)
       .then(() => {
           res.redirect('/reservation');
       })
       .catch(err => {
            let allClients, allCars, reservationEdit;
            ReservationRepository.getReservationById(reservationId)
                .then(reservation => {
                    reservationEdit = reservation;
                    return ClientRepository.getClients()
                })
                .then(clients => {
                    allClients = clients;
                    return CarRepository.getCars()
                })
                .then(cars => {
                    allCars = cars;
                    res.render('pages/reservation/edit', {
                        formMode: 'edit',
                        reservationData: reservationData,
                        reservation: reservationEdit,
                        allClients: allClients,
                        allCars: allCars,
                        pageTitle: 'Edytuj rezerwacje',
                        btnLabel: 'Edytuj rezerwacje',
                        formAction: '/reservation/edit/' + reservationId,
                        navLocation: 'reservation',
                        validationErrors: err.errors
                    })
                })
       })
}

exports.deleteReservation = (req, res, next) => {
    const reservationId = req.params.reservationId;

    ReservationRepository.deleteReservation(reservationId)
        .then(() => {
            res.redirect('/reservation');
        })
}