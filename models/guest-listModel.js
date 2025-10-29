
const mongoose = require('mongoose');

const GuestListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        enum: ['Balintawak-Office', 'SQ-Office', 'Others'],
    },
    department: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: false,
        enum: ['Guest', 'Employee'],
        default: 'Employee'
    },
    isAttending: {
        type: Boolean,
        required: true,
        default: false
    },
    isFirstRaffleWinner: {
        type: Boolean,
        required: false,
        default: false
    },
    isSecondRaffleWinner: {
        type: Boolean,
        required: false,
        default: false
    },
    isThirdRaffleWinner: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });

const GuestList = mongoose.model('GuestList', GuestListSchema);
module.exports = GuestList;
