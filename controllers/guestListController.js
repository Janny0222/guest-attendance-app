const GuestList = require('../models/guestListModel');

const getAllGuests = async (req, res) => {
    try {
        const guests = await GuestList.findAll();
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addGuest = async (req, res) => {
    try {
        const { name, group } = req.body;
        const newGuest = await GuestList.create({ name, group});
        res.status(201).json(newGuest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getGuestByName = async (req, res) => {
    try {
        const { name } = req.params;
        const guest = await GuestList.findOne({ where: { name } });
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        guest.isAttending = true;
        await guest.save();

        const io = req.app.get("socketio");

        io.emit("scan-guest-updated", guest);
        return res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllGuests,
    addGuest,
    getGuestByName
}