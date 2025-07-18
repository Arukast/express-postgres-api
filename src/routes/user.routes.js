const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const validateRequest = require('../middlewares/validateRequest.middleware');
const { userRegistrationSchema, userUpdateSchema } = require('../validators/user.schema');


router.post('/create', validateRequest(userRegistrationSchema), userController.create);
router.get('/find-all', authenticate, authorize(['admin']), validateRequest(userUpdateSchema), userController.findAll);
// TODO: Implement update profile for users
router.put('/:id', authenticate, authorize(['admin']), validateRequest(userUpdateSchema), userController.update);
router.delete('/:id', authenticate, authorize(['admin']), userController.delete);

module.exports = router;