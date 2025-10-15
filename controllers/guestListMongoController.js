const GuestList = require("../models/guest-listModel");

const getAllGuests = async (req, res) => {
  try {
    const guests = await GuestList.find();

    
    return res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSpecificGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await GuestList.findById(id);
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGuest = async (req, res) => {
  try {
    const { name, group } = req.body;
    const newGuest = new GuestList({ name, group });
    await newGuest.save();

    const io = req.app.get("socketio");
    io.emit("new-guest", newGuest);
    res.status(201).json(newGuest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuestByName = async (req, res) => {
  try {
    const { name } = req.params;
    const guest = await GuestList.findOne({ name });
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    guest.isAttending = true;
    await guest.save();
    
    const io = req.app.get("socketio");
    io.emit("scan-guest-updated", guest);
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuestByUserType = async (req, res) => {
  try {
    const { userType } = req.params;
    const guests = await GuestList.find({ userType });
    if (guests.length === 0) {
      return res.status(404).json({ message: "No guests found for the specified user type" });
    }
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGuests,
  addGuest,
  getGuestByName,
  getSpecificGuest,
  getGuestByUserType
};
