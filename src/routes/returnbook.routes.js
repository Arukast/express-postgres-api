const express = require('express');
const returnBookController = require('../controllers/returnbook.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const validateRequest = require('../middlewares/validateRequest.middleware');
const { returnBookCreationSchema, returnBookUpdateSchema } = require('../validators/returnbook.schema');

router.post('/create', authenticate, authorize(['admin']), validateRequest(returnBookCreationSchema), returnBookController.create);
router.get('/find-all', authenticate, authorize(['admin']), returnBookController.findAll);
router.put('/:id', authenticate, authorize(['admin']), validateRequest(returnBookUpdateSchema), returnBookController.update);
router.delete('/:id', authenticate, authorize(['admin']), returnBookController.delete);

module.exports = router;