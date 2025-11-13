const GuestList = require("../models/guest-listModel");
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
        const { name, group, department, userType } = req.body;
        
        const existingGuest = await GuestAttendees.findOne({ name });

        if (existingGuest) {
            return res.status(400).json({ message: "Guest already exists" });
        }
        const newAttendee = await GuestAttendees.create({ name, group, department, userType, time_arrival: new Date() });

        const io = req.app.get("socketio");
        io.emit("guest-verified", newAttendee);
        res.status(201).json(newAttendee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllAttendees = async (req, res) => {
    try {
        await Promise.all([
            GuestAttendees.deleteMany({}),
            GuestList.updateMany({})
        ]);
        res.status(200).json({ message: "All attendees deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAttendees,
    addAttendee,
    deleteAllAttendees
};