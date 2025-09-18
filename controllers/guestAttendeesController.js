const GuestAttendees = require("../models/guestAttendeesModel");

const getAllAttendees = async (req, res) => {
    try {
        const guests = await GuestAttendees.find();
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAttendee = async (req, res) => {
    try {
        const { name, company } = req.body;
        const newAttendee = await GuestAttendees.create({ name, company, time_arrival: new Date() });

        const io = req.app.get("socketio");
        io.emit("guest-verified", newAttendee);
        res.status(201).json(newAttendee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAttendees,
    addAttendee
};