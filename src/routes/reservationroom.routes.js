const express = require('express');
const reservationRoomController = require('../controllers/reservationroom.controller');
const router = express.Router();

router.post('/Create', reservationRoomController.create);
router.get('/Find-All', reservationRoomController.findAll);
router.put('/:id', reservationRoomController.update);
router.delete('/:id', reservationRoomController.delete);

module.exports = router;