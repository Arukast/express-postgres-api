const borrowBookService = require('../services/borrowbook.service');

exports.create = async (req, res) => {
    try {
        const borrowBookData = req.body;
        const newBorrowBook = await borrowBookService.createBook(borrowBookData);
        res.status(201).json(newBorrowBook);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const books = await borrowBookService.getAllBorrowBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const bookId = req.params.id;
        const borrowBookDataToUpdate = req.body;
        const updatedBorrowBook = await borrowBookService.updateBorrowBook(bookId, borrowBookDataToUpdate);
        if (!updatedBorrowBook) {
            return res.status(404).json({ message: 'Buku tidak ditemukan untuk diperbarui' });
        }
        res.status(200).json(updatedBorrowBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const bookId = req.params.id;
        const result = await borrowBookService.deleteBorrowBook(bookId);
        if (!result) {
            return res.status(404).json({ message: 'Buku tidak ditemukan untuk dihapus' });
        }
        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}