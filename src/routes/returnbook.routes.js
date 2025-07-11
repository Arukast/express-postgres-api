const express = require('express');
const returnBookController = require('../controllers/returnbook.controller');
const router = express.Router();

router.post('/Create', returnBookController.create);
router.get('/find-all', returnBookController.findAll);
router.put('/:id', returnBookController.update);
router.delete('/:id', returnBookController.delete);

module.exports = router;