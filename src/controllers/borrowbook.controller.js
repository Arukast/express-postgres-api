const borrowBookService = require('../services/borrowbook.service');
const AppError = require('../utils/AppError');

exports.create = async (req, res, next) => {
    try {
        const borrowBookData = req.body;
        const newBorrowBook = await borrowBookService.createBorrowBook(borrowBookData);
        res.status(201).json(newBorrowBook);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return next(new AppError('Buku ini sudah terdata sebagai buku yang dipinjam.', 409));
        }
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const books = await borrowBookService.getAllBorrowBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const borrowBookId = req.params.id;
        const borrowBookDataToUpdate = req.body;
        const updatedBorrowBook = await borrowBookService.updateBorrowBook(borrowBookId, borrowBookDataToUpdate);
        if (!updatedBorrowBook) {
            return next(new AppError(`Tidak dapat memperbarui Peminjaman Buku dengan id=${borrowBookId}. Mungkin Peminjaman Buku tidak ditemukan atau data yang diberikan tidak berubah.`, 404));
        }
        res.status(200).json(updatedBorrowBook);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const borrowBookId = req.params.id;
        const result = await borrowBookService.deleteBorrowBook(borrowBookId);
        if (!result) {
            return next(new AppError(`Tidak dapat menghapus Peminjaman Buku dengan id=${borrowBookId}. Mungkin Peminjaman Buku tidak ditemukan.`, 404));
        }
        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        next(error);
    }
}