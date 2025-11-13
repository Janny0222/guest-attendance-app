const express = require('express');
const router = express.Router();
const raffleController = require('../controllers/raffleController');

router.get('/firstRaffle/:name', raffleController.scanFirstRaffle);
router.get('/firstRaffle', raffleController.getFirstRaffleWinners);
router.get('/secondRaffle/:name', raffleController.scanSecondRaffle);
router.get('/secondRaffle', raffleController.getSecondtRaffleWinners);
router.get('/thirdRaffle/:name', raffleController.scanThirdRaffle);
router.get('/thirdRaffle', raffleController.getThirdRaffleWinners);


module.exports = router;