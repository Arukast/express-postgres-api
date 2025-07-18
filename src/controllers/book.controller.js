const bookService = require('../services/book.service');
const AppError = require('../utils/AppError');

exports.create = async (req, res, next) => {
    try {
        const bookData = req.body;
        const newBook = await bookService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return next(new AppError(error.message, 409));
        }
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const bookDataToUpdate = req.body;
        const updatedBook = await bookService.updateBook(bookId, bookDataToUpdate);
        if (!updatedBook) {
            next(new AppError({ message: error.message }, 404));
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const result = await bookService.deleteBook(bookId);
        if (!result) {
            return next(new AppError('Buku tidak ditemukan untuk dihapus', 404));
        }
        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        next(error);
    }
}