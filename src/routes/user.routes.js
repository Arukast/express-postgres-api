const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/create', userController.create);
router.get('/find-all', userController.findAll);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;