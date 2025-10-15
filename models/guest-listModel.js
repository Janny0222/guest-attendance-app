const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const mongoose = require('mongoose');

const GuestListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        enum: ['Balintawak-Office', 'SQ-Office'],
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
}, { timestamps: true });

const GuestList = mongoose.model('GuestList', GuestListSchema);
module.exports = GuestList;
