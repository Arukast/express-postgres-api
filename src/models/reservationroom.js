'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReservationRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReservationRoom.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  ReservationRoom.init({
    user_id: DataTypes.INTEGER,
    reservation_date: DataTypes.DATE,
    room_number: DataTypes.INTEGER,
    reservation_end_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ReservationRoom',
  });
  return ReservationRoom;
};