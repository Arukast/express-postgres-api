'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BorrowBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BorrowBook.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book'
      });
      BorrowBook.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      BorrowBook.hasOne(models.ReturnBook, {
        foreignKey: 'borrowBook_id',
        as: 'borrowBook'
      });
    }
  }
  BorrowBook.init({
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    borrow_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'BorrowBook',
  });
  return BorrowBook;
};