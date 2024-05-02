const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list', { 
                clients: clients,
                navLocation: 'client'
            });
        });
}

exports.showClientFormNew = (req, res, next) => {
    res.render('pages/client/add', { 
        navLocation: 'client',
        client: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/client/add',
        validationErrors: []
    });
}

exports.showClientFormEdit = (req, res, next) => {
    const clientId = req.params.clientId;
    
    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/edit', {
                navLocation: 'client',
                client: client,
                pageTitle: 'Edytuj klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/client/edit/' + clientId,
                validationErrors: []
        });
    });
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;

    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/details', {
                navLocation: 'client',
                client: client,
                pageTitle: 'Szczegóły klienta',
                formMode: 'showDetails',
                formAction: '',
                validationErrors: []
        });
    });
}

exports.addClient = (req, res, next) => {
    const clientData = {...req.body};

    ClientRepository.createClient(clientData)
        .then(() => {
            res.redirect('/client');
        })
        .catch(err => {
            res.render('pages/client/add', {
                client: clientData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/client/add',
                navLocation: 'client',
                validationErrors: err.errors
            })
        })
}

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = {...req.body};
    
    ClientRepository.updateClient(clientId, clientData)
        .then(() => {
            res.redirect('/client');
        })
        .catch(err => {
            res.render('pages/client/edit', {
                client: clientData,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/client/edit/' + clientId,
                navLocation: 'client',
                validationErrors: err.errors
            })
        })
}

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;

    ClientRepository.deleteClient(clientId)
        .then(() => {
            res.redirect('/client');
    });
}