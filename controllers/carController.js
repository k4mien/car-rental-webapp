const CarRepository = require('../repository/sequelize/CarRepository');

exports.showCarList = (req, res, next) => {
    CarRepository.getCars()
        .then(cars => {
            res.render('pages/car/list', { 
                cars: cars,
                navLocation: 'car'
            });
        });
}

exports.showCarFormNew = (req, res, next) => {
    res.render('pages/car/add', { 
        navLocation: 'car',
        car: {},
        pageTitle: 'Nowy samochód',
        formMode: 'createNew',
        btnLabel: 'Dodaj samochód',
        formAction: '/car/add',
        validationErrors: []  
    });
}

exports.showCarFormEdit = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/edit', {
                navLocation: 'car',
                car: car,
                pageTitle: 'Edytuj samochód',
                formMode: 'edit',
                btnLabel: 'Edytuj samochód',
                formAction: '/car/edit/' + carId,
                validationErrors: []
        });
    });
}

exports.showCarDetails = (req, res, next) => {
    const carId = req.params.carId;

    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/details', {
                navLocation: 'car',
                car: car,
                pageTitle: 'Szczegóły samochodu',
                formMode: 'showDetails',
                formAction: '',
                validationErrors: []
        });
    });
}

exports.addCar = (req, res, next) => {
    const carData = {...req.body};

    CarRepository.createCar(carData)
        .then(() => {
            res.redirect('/car');
        })
        .catch(err => {
           res.render('pages/car/add', {
               car: carData,
               pageTitle: 'Nowy samochód',
               formMode: 'createNew',
               btnLabel: 'Dodaj samochód',
               formAction: '/car/add',
               navLocation: 'car',
               validationErrors: err.errors
        });
    });
}

exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = {...req.body};

    CarRepository.updateCar(carId, carData)
       .then(() => {
           res.redirect('/car');
       })
       .catch(err => {
            res.render('pages/car/edit', {
                car: carData,
                formMode: 'edit',
                pageTitle: 'Edycja samochodu',
                btnLabel: 'Edytuj samochód',
                formAction: '/car/edit/' + carId,
                navLocation: 'car',
                validationErrors: err.errors
        })
    })
}

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;

    CarRepository.deleteCar(carId)
        .then(() => {
            res.redirect('/car');
    });
}