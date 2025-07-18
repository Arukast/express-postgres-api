const { BorrowBook } = require("../../models");

exports.createBorrowBook = async (borrowBookData) => {
    const newBorrowBook = await BorrowBook.create(borrowBookData);
    return newBorrowBook;
};

exports.getAllBorrowBooks = async () => {
    const books = await BorrowBook.findAll();
    return books;
}

exports.updateBorrowBook = async (borrowBookId, borrowBookDataToUpdate) => {
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