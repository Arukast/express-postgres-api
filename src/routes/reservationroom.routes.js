const express = require('express');
const reservationRoomController = require('../controllers/reservationroom.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/rbac.middleware');
const validateRequest = require('../middlewares/validateRequest.middleware');
const { reservationRoomCreationSchema, reservationRoomUpdateSchema } = require('../validators/reservationroom.schema');

router.post('/create', authenticate, authorize(['admin']), validateRequest(reservationRoomCreationSchema), reservationRoomController.create);
router.get('/find-all', authenticate, authorize(['admin']), reservationRoomController.findAll);
router.put('/:id', authenticate, authorize(['admin']), validateRequest(reservationRoomUpdateSchema), reservationRoomController.update);
router.delete('/:id', authenticate, authorize(['admin']), reservationRoomController.delete);

module.exports = router;