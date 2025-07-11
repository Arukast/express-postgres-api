const express = require('express');
const bookController = require('../controllers/book.controller');
const router = express.Router();

router.post('/create', bookController.create);
router.get('/find-all', bookController.findAll);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;