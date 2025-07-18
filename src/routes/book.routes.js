const express = require('express');
const bookController = require('../controllers/book.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const validateRequest = require('../middlewares/validateRequest.middleware');
const { bookCreationSchema, bookUpdateSchema } = require('../validators/book.schema');

router.post('/create', authenticate, authorize(['admin']), validateRequest(bookCreationSchema), bookController.create);
router.get('/find-all', authenticate, authorize(['admin', 'user']), bookController.findAll);
router.put('/:id', authenticate, authorize(['admin']), validateRequest(bookUpdateSchema), bookController.update);
router.delete('/:id', authenticate, authorize(['admin']), bookController.delete);

module.exports = router;