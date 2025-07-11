const db = require('../models');
const Book = db.Book; // Mengakses model User

exports.createBook = async (bookData) => {
    if (!bookData.title || !bookData.author || !bookData.quantity) {
        throw new Error("Judul, Author, Kuantitas tidak boleh kosong.");
    }
    
    const newBook = await Book.create(bookData);
    return newBook;
};

exports.getAllBooks = async () => {
    const books = await Book.findAll();
    return books;
}

// TODO: Fix
exports.updateBook = async (bookId, bookDataToUpdate) => {
    if (!bookDataToUpdate.title && !bookDataToUpdate.author && !bookDataToUpdate.quantity) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
        return null; // Buku tidak ditemukan
    }

    await book.save();
    return book;
}

exports.deleteBook = async (bookId) => {
    const book = await Book.findByPk(bookId);
    if (!book) {
        return null; // Pengguna tidak ditemukan
    }
    
    await book.destroy();
    return true; // Pengguna berhasil dihapus
}