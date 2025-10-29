const GuestList = require('../models/guest-listModel');

const scanFirstRaffle = async (req, res) => {
    try {
        const { name } = req.params;
        const guest = await GuestList.findOne({ name });
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found or Invalid QR' });
        }

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
        const winners = await GuestList.find({ isFirstRaffleWinner: true });
        if(!winners){
            return res.status(404).json({ message: 'No winners found' });
        }
        res.status(200).json(winners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { scanFirstRaffle, getFirstRaffleWinners };