const db = require('../models');
const returnBook = db.ReturnBook; // Mengakses model User

exports.createReturnBook = async (returnBookData) => {
    if (!returnBookData.borrowBook_id || !returnBookData.return_date || !returnBookData.status) {
        throw new Error("Id Pengembalian, Tanggal Pengembalian, Status tidak boleh kosong.");
    }
    
    const newReturnBook = await returnBook.create(returnBookData);
    return newReturnBook;
};

exports.getAllReturnBooks = async () => {
    const returnBooks = await returnBook.findAll();
    return returnBooks;
}

// TODO: Fix
exports.updateReturnBook = async (bookId, bookDataToUpdate) => {
    if (!bookDataToUpdate.borrowbook_id && !bookDataToUpdate.return_date && !bookDataToUpdate.status) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const returnBook = await returnBook.findByPk(bookId);
    if (!returnBook) {
        return null; // Buku tidak ditemukan
    }

    await returnBook.save();
    return returnBook;
}

exports.deleteReturnBook = async (bookId) => {
    const returnBook = await returnBook.findByPk(bookId);
    if (!returnBook) {
        return null; // Pengguna tidak ditemukan
    }
    
    await returnBook.destroy();
    return true; // Pengguna berhasil dihapus
}