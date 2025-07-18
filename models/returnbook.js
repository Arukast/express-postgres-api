'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReturnBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReturnBook.belongsTo(models.BorrowBook, {
        foreignKey: 'borrowBook_id',
        as: 'BorrowBook'
      });
    }
  }
  ReturnBook.init({
    borrowBook_id: DataTypes.INTEGER,
    return_date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('On Time', 'Late'),
    }
  }, {
    sequelize,
    modelName: 'ReturnBook',
  });
  return ReturnBook;
};