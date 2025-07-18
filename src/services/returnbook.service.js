const { ReturnBook } = require("../../models");

exports.createReturnBook = async (returnBookData) => {
    const newReturnBook = await ReturnBook.create(returnBookData);
    return newReturnBook;
};

exports.getAllReturnBooks = async () => {
    const returnBooks = await ReturnBook.findAll();
    return returnBooks;
}

exports.updateReturnBook = async (bookId, bookDataToUpdate) => {
    const [num] = await ReturnBook.update(
        bookDataToUpdate, {
        where: { id: bookId }
    });
    
    if (num === 1) {
        const updatedBook = await ReturnBook.findByPk(bookId);
        return updatedBook; // Mengembalikan pengguna yang diperbarui 
    } else {
        throw new Error(`Tidak dapat memperbarui Pengembalian Buku dengan id=${bookId}. Mungkin Pengembalian Buku tidak ditemukan atau data yang diberikan tidak berubah.`);
    }
}

exports.deleteReturnBook = async (bookId) => {
    const returnBook = await returnBook.findByPk(bookId);
    if (!returnBook) {
        return null; // Pengguna tidak ditemukan
    }
    
    await returnBook.destroy();
    return true; // Pengguna berhasil dihapus
}