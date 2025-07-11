const express = require('express');
const borrowbookController = require('../controllers/borrowbook.controller');
const router = express.Router();

router.post('/create', borrowbookController.create);
router.get('/find-All', borrowbookController.findAll);
router.put('/:id', borrowbookController.update);
router.delete('/:id', borrowbookController.delete);

module.exports = router;