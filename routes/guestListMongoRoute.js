const express = require('express');
const router = express.Router();
const guestListMongoController = require('../controllers/guestListMongoController');

router.get('/', guestListMongoController.getAllGuests);
router.post('/', guestListMongoController.addGuest);
router.get('/:name', guestListMongoController.getGuestByName);
router.get('/id/:id', guestListMongoController.getSpecificGuest);
router.get('/type/:userType', guestListMongoController.getGuestByUserType);


module.exports = router;