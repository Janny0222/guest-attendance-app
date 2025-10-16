const mongoose = require('mongoose');

const GuestAttendeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
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
  