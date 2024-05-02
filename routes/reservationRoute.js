const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
router.get('/', reservationController.showReservationList);
router.get('/add', reservationController.showReservationFormNew);
router.get('/edit/:reservationId', reservationController.showReservationFormEdit);
router.get('/details/:reservationId', reservationController.showReservationDetails);

router.post('/add', reservationController.addReservation);
router.post('/edit/:reservationId', reservationController.updateReservation);
router.get('/delete/:reservationId', reservationController.deleteReservation);

module.exports = router;