const { BorrowBook } = require("../models");

exports.createBorrowBook = async (borrowBookData) => {
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

exports.updateBorrowBook = async (borrowBookId, borrowBookDataToUpdate) => {
    if (!borrowBookDataToUpdate.book_id && !borrowBookDataToUpdate.book_id && !borrowBookDataToUpdate.borrow_date && !borrowBookDataToUpdate.due_date) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const [num] = await BorrowBook.update(
        borrowBookDataToUpdate, {
        where: { id: borrowBookId }
    });
    
    if (num === 1) {
        const updatedBorrowBook = await BorrowBook.findByPk(borrowBookId);
        return updatedBorrowBook; // Mengembalikan pengguna yang diperbarui 
    } else {
        throw new Error(`Tidak dapat memperbarui Peminjaman Buku dengan id=${borrowBookId}. Mungkin Peminjaman Buku tidak ditemukan atau data yang diberikan tidak berubah.`);
    }
}

exports.deleteBorrowBook = async (bookId) => {
    const borrowBook = await borrowBook.findByPk(bookId);
    if (!borrowBook) {
        return null; // Pengguna tidak ditemukan
    }
    
    await borrowBook.destroy();
    return true; // Pengguna berhasil dihapus
}