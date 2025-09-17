const express = require('express');
const router = express.Router();
const guestAttendeesController = require('../controllers/guestAttendeesController');

router.get('/', guestAttendeesController.getAllAttendees);
router.post('/', guestAttendeesController.addAttendee);

module.exports = router;