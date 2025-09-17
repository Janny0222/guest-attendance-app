const mongoose = require('mongoose');

const GuestAttendeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false,
    },
    time_arrival: {
        type: Date,
        required: true,
        default: Date.now
    },
}, { timestamps: true });

const GuestAttendees = mongoose.model('GuestAttendees', GuestAttendeesSchema);
module.exports = GuestAttendees;
  