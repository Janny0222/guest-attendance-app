const GuestList = require("../models/guest-listModel");

const getAllGuests = async (req, res) => {
  try {
    const guests = await GuestList.find();
    return res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

const addGuest = async (req, res) => {
  try {
    const { name, company } = req.body;
    const newGuest = new GuestList({ name, company });
    await newGuest.save();
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

module.exports = {
  getAllGuests,
  addGuest,
  getGuestByName,
};
