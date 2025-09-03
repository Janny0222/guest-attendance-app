const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const mongoose = require('mongoose');

const GuestListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false,
    },
    isAttending: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });

const GuestList = mongoose.model('GuestList', GuestListSchema);
module.exports = GuestList;
