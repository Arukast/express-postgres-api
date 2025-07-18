const returnBookService = require('../services/returnbook.service');
const AppError = require('../utils/AppError');

exports.create = async (req, res, next) => {
    try {
        const returnBookData = req.body;
        const newReturnBook = await returnBookService.createReturnBook(returnBookData);
        res.status(201).json(newReturnBook);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return next(new AppError('Pengembalian buku sudah terdata', 409));
        }
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const returnBooks = await returnBookService.getAllReturnBooks();
        res.status(200).json(returnBooks);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const returnBookId = req.params.id;
        const returnBookDataToUpdate = req.body;
        const updatedReturnBook = await returnBookService.updateReturnBook(returnBookId, returnBookDataToUpdate);
        if (!updatedReturnBook) {
            return next(new AppError('Pengembalian tidak ditemukan untuk diperbarui', 404));
        }
        res.status(200).json(updatedReturnBook);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const returnBookId = req.params.id;
        const result = await returnBookService.deleteReturnBook(returnBookId);
        if (!result) {
            return next(new AppError('Pengembalian tidak ditemukan untuk dihapus', 404));
        }
        res.status(200).json({ message: 'Pengembalian berhasil dihapus' });
    } catch (error) {
        next(error);
    }
}