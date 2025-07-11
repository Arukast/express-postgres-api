const db = require('../models');
const BorrowBook = db.BorrowBook; // Mengakses model User

exports.createBook = async (borrowBookData) => {
    if (!borrowBookData.book_id || !borrowBookData.user_id || !borrowBookData.borrow_date || !borrowBookData.due_date) {
        throw new Error("Id Buku, Id User, Tanggal Pinjam, Tanggal Batas Pinjam tidak boleh kosong.");
    }
    
    const newBorrowBook = await BorrowBook.create(borrowBookData);
    return newBorrowBook;
};

exports.getAllBorrowBooks = async () => {
    const books = await BorrowBook.findAll();
    return books;
}

// TODO: Fix
exports.updateBorrowBook = async (bookId, borrowBookDataToUpdate) => {
    if (!borrowBookDataToUpdate.book_id && !borrowBookDataToUpdate.book_id && !borrowBookDataToUpdate.borrow_date && !borrowBookDataToUpdate.due_date) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const book = await BorrowBook.findByPk(bookId);
    if (!book) {
        return null; // Buku tidak ditemukan
    }

    await book.save();
    return book;
}

exports.deleteBorrowBook = async (bookId) => {
    const borrowBook = await BorrowBook.findByPk(bookId);
    if (!borrowBook) {
        return null; // Pengguna tidak ditemukan
    }
    
    await borrowBook.destroy();
    return true; // Pengguna berhasil dihapus
}