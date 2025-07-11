const bookService = require('../services/book.service');

exports.create = async (req, res) => {
    try {
        const bookData = req.body;
        const newBook = await bookService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookDataToUpdate = req.body;
        const updatedBook = await bookService.updateBook(bookId, bookDataToUpdate);
        if (!updatedBook) {
            return res.status(404).json({ message: 'Buku tidak ditemukan untuk diperbarui' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const bookId = req.params.id;
        const result = await bookService.deleteBook(bookId);
        if (!result) {
            return res.status(404).json({ message: 'Buku tidak ditemukan untuk dihapus' });
        }
        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}