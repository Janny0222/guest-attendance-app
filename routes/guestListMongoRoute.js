const express = require('express');
const router = express.Router();
const guestListMongoController = require('../controllers/guestListMongoController');

router.get('/', guestListMongoController.getAllGuests);
router.post('/', guestListMongoController.addGuest);
router.get('/:name', guestListMongoController.getGuestByName);


module.exports = router;