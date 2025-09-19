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
    userType: {
        type: String,
        required: true,
        enum: ['Guest', 'Employee']
    },
    time_arrival: {
        type: Date,
        required: true,
        default: Date.now
    },
}, { timestamps: true });

const GuestAttendees = mongoose.model('GuestAttendees', GuestAttendeesSchema);
module.exports = GuestAttendees;
  