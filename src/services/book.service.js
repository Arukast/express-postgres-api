const { Book } = require("../models");

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

exports.updateBook = async (bookId, bookDataToUpdate) => {
    if (!bookDataToUpdate.title && !bookDataToUpdate.author && !bookDataToUpdate.quantity) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const [num] = await Book.update(
        bookDataToUpdate, {
        where: { id: bookId }
    });
    
    if (num === 1) {
        const updatedBook = await Book.findByPk(bookId);
        return updatedBook; // Mengembalikan pengguna yang diperbarui 
    } else {
        throw new Error(`Tidak dapat memperbarui Buku dengan id=${bookId}. Mungkin Buku tidak ditemukan atau data yang diberikan tidak berubah.`);
    }
}

exports.deleteBook = async (bookId) => {
    const book = await Book.findByPk(bookId);
    if (!book) {
        return null; // Pengguna tidak ditemukan
    }
    
    await book.destroy();
    return true; // Pengguna berhasil dihapus
}