const GuestList = require('../models/guest-listModel');
const { all } = require('../routes/guestAttendeesRoute');

const scanFirstRaffle = async (req, res) => {
    try {
        const { name } = req.params;
        const allGuest = await GuestList.find({ isFirstRaffleWinner: true });
        const guest = await GuestList.findOne({ name });
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found or Invalid QR' });
        }

        if (guest.isFirstRaffleWinner) {
            return res.status(400).json({ message: 'Guest has already won the first raffle' });
        }

        console.log(allGuest.length);
        guest.firstRaffleCount = allGuest.length + 1;
        guest.isFirstRaffleWinner = true;
        await guest.save();

         const io = req.app.get("socketio");
         io.emit("first-raffle-winner-updated", guest);

        return res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFirstRaffleWinners = async (req, res) => {
    try {
        const winners = await GuestList.find({ isFirstRaffleWinner: true }).sort({ firstRaffleCount: 1 });
        if(!winners){
            return res.status(404).json({ message: 'No winners found' });
        }
        res.status(200).json(winners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Second Raffle
const scanSecondRaffle = async (req, res) => {
    try {
        const { name } = req.params;
        const allGuest = await GuestList.find({ isSecondRaffleWinner: true });
        const guest = await GuestList.findOne({ name });
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found or Invalid QR' });
        }

        if (guest.isSecondRaffleWinner) {
            return res.status(400).json({ message: 'Guest has already won the second raffle' });
        }

        console.log(allGuest.length);
        guest.secondRaffleCount = allGuest.length + 1;
        guest.isSecondRaffleWinner = true;
        await guest.save();

         const io = req.app.get("socketio");
         io.emit("second-raffle-winner-updated", guest);

        return res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getSecondtRaffleWinners = async (req, res) => {
    try {
        const winners = await GuestList.find({ isSecondRaffleWinner: true }).sort({ secondRaffleCount: 1 });
        if(!winners){
            return res.status(404).json({ message: 'No winners found' });
        }
        res.status(200).json(winners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Third raffle

const scanThirdRaffle = async (req, res) => {
    try {
        const { name } = req.params;
        const allGuest = await GuestList.find({ isThirdRaffleWinner: true });
        const guest = await GuestList.findOne({ name });
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found or Invalid QR' });
        }

        if ( guest.isFirstRaffleWinner && guest.isSecondRaffleWinner) {
            return res.status(400).json({ message: 'Guest has already won the 1st and 2nd raffle' });
        }

        console.log(allGuest.length);
        guest.secondRaffleCount = allGuest.length + 1;
        guest.isSecondRaffleWinner = true;
        await guest.save();

         const io = req.app.get("socketio");
         io.emit("third-raffle-winner-updated", guest);

        return res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getThirdRaffleWinners = async (req, res) => {
    try {
        const winners = await GuestList.find({ isThirdRaffleWinner: true }).sort({ thirdRaffleCount: 1 });
        if(!winners){
            return res.status(404).json({ message: 'No winners found' });
        }
        res.status(200).json(winners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { 
    scanFirstRaffle, 
    getFirstRaffleWinners,
    scanSecondRaffle,
    getSecondtRaffleWinners,
    scanThirdRaffle,
    getThirdRaffleWinners 
};