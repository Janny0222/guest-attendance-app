const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { is } = require('sequelize/lib/operators');

const GuestList = sequelize.define('GuestList', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isAttending: {
        type: DataTypes.BOOLEAN,        
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: 'guest_list',
    timestamps: true,
});

module.exports = GuestList;

