const reservationRoomService = require('../services/reservationroom.service');
const AppError = require('../utils/AppError');

exports.create = async (req, res, next) => {
    try {
        const reservationRoomData = req.body;
        const newReservationRoom = await reservationRoomService.createReservationRoom(reservationRoomData);
        res.status(201).json(newReservationRoom);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return next(new AppError('Reservasi Kamar dengan ID tersebut sudah terdata', 409));
        }
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const reservationRoom = await reservationRoomService.getAllReservationRoom();
        res.status(200).json(reservationRoom);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const reservationRoomId = req.params.id;
        const reservationRoomDataToUpdate = req.body;
        const updatedReservationRoom = await reservationRoomService.updateReservationRoom(reservationRoomId, reservationRoomDataToUpdate);
        if (!updatedReservationRoom) {
            return next(new AppError('Reservasi Kamar tidak ditemukan untuk diperbarui', 404));
        }
        res.status(200).json(updatedReservationRoom);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const reservationRoomId = req.params.id;
        const result = await reservationRoomService.deleteReservationRoom(reservationRoomId);
        if (!result) {
            return next(new AppError('Reservasi Kamar tidak ditemukan untuk dihapus', 404));
        }
        res.status(200).json({ message: 'Reservasi Kamar berhasil dihapus' });
    } catch (error) {
        next(error);
    }
}