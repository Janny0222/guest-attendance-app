const express = require('express');
const router = express.Router();
const firstRaffleController = require('../controllers/raffleController');

router.get('/firstRaffle/:name', firstRaffleController.scanFirstRaffle);
router.get('/firstRaffle', firstRaffleController.getFirstRaffleWinners);

module.exports = router;