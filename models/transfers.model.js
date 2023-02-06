const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Transfer = db.define('transfers', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
