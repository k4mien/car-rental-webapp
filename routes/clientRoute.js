const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
router.get('/', clientController.showClientList);
router.get('/add', clientController.showClientFormNew);
router.get('/edit/:clientId', clientController.showClientFormEdit);
router.get('/details/:clientId', clientController.showClientDetails);

router.post('/add', clientController.addClient);
router.post('/edit/:clientId', clientController.updateClient);
router.get('/delete/:clientId', clientController.deleteClient);

module.exports = router;