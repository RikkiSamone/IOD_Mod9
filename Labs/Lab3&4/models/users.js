const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelize = require('../config/database');

const sequelizeInstance = dbConnect.Sequelize; 
class User extends Model { }

User.init({
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  profile_picture: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'users9'
});

module.exports = User;