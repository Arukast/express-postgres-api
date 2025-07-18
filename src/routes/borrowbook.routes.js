const express = require('express');
const borrowbookController = require('../controllers/borrowbook.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const validateRequest = require('../middlewares/validateRequest.middleware');
const { borrowbookCreationSchema, borrowbookUpdateSchema } = require('../validators/borrowbook.schema');

router.post('/create', authenticate, authorize(['admin', 'user']), validateRequest(borrowbookCreationSchema), borrowbookController.create);
router.get('/find-all', authenticate, authorize(['admin', 'user']), borrowbookController.findAll);
router.put('/:id', authenticate, authorize(['admin']), validateRequest(borrowbookUpdateSchema), borrowbookController.update);
router.delete('/:id', authenticate, authorize(['admin']), borrowbookController.delete);

module.exports = router;