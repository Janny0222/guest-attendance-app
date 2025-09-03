const express = require('express');
const router = express.Router();
const guestListController = require('../controllers/guestListController');

router.get('/', guestListController.getAllGuests);
router.post('/', guestListController.addGuest);
router.get('/:name', guestListController.getGuestByName);

module.exports = router;