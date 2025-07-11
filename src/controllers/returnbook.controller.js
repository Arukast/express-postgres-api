const returnBookService = require('../services/returnbook.service');

exports.create = async (req, res) => {
    try {
        const returnBookData = req.body;
        const newReturnBook = await returnBookService.createReturnBook(returnBookData);
        res.status(201).json(newReturnBook);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const returnBooks = await returnBookService.getAllReturnBooks();
        res.status(200).json(returnBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const returnBookId = req.params.id;
        const returnBookDataToUpdate = req.body;
        const updatedReturnBook = await returnBookService.updateReturnBook(returnBookId, returnBookDataToUpdate);
        if (!updatedReturnBook) {
            return res.status(404).json({ message: 'Pengembalian tidak ditemukan untuk diperbarui' });
        }
        res.status(200).json(updatedReturnBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const returnBookId = req.params.id;
        const result = await returnBookService.deleteReturnBook(returnBookId);
        if (!result) {
            return res.status(404).json({ message: 'Pengembalian tidak ditemukan untuk dihapus' });
        }
        res.status(200).json({ message: 'Pengembalian berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}